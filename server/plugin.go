package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime/debug"
	"strings"
	"sync"

	"github.com/gorilla/mux"
	"github.com/mattermost/mattermost-server/v5/plugin"
)

// Plugin implements the interface expected by the Mattermost server to communicate between the server and plugin processes.
type Plugin struct {
	plugin.MattermostPlugin

	// configurationLock synchronizes access to the configuration.
	configurationLock sync.RWMutex

	// configuration is the active plugin configuration. Consult getConfiguration and
	// setConfiguration for usage.
	configuration *configuration

	router *mux.Router
}

func (p *Plugin) OnActivate() error {
	p.initializeAPI()

	return nil
}

func (p *Plugin) checkAuth(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.Header.Get("Mattermost-User-ID")
		if userID == "" {
			w.Header().Add("Content-Type", "application/json")
			w.Write([]byte("Not authorized"))
			w.WriteHeader(http.StatusForbidden)
			return
		}

		handler(w, r)
	}
}

func (p *Plugin) withRecovery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if x := recover(); x != nil {
				p.API.LogError("Recovered from a panic",
					"url", r.URL.String(),
					"error", x,
					"stack", string(debug.Stack()))
			}
		}()

		next.ServeHTTP(w, r)
	})
}

func (p *Plugin) initializeAPI() {
	p.router = mux.NewRouter()
	p.router.Use(p.withRecovery)

	apiRouter := p.router.PathPrefix("/api/v1").Subrouter()

	apiRouter.HandleFunc("/create", p.checkAuth(p.handleCreateMeeting)).Methods(http.MethodGet)
	apiRouter.HandleFunc("/configuration", p.checkAuth(p.handleConfiguration)).Methods(http.MethodGet)
}

// ServeHTTP demonstrates a plugin that handles HTTP requests by greeting the world.
func (p *Plugin) ServeHTTP(c *plugin.Context, w http.ResponseWriter, r *http.Request) {
	p.router.ServeHTTP(w, r)
}

// See https://developers.mattermost.com/extend/plugins/server/reference/

// Creates a meeting room
func (p *Plugin) handleConfiguration(w http.ResponseWriter, r *http.Request) {
	configuration := p.getConfiguration()

	props := make(map[string]string)
	props["ServerURL"] = configuration.ServerURL

	w.Header().Add("Content-Type", "application/json")
	w.Write([]byte(MapToJSON(props)))
	w.WriteHeader(http.StatusOK)
}

// Creates a meeting room
func (p *Plugin) handleCreateMeeting(w http.ResponseWriter, r *http.Request) {

	configuration := p.getConfiguration()
	configServerURL := configuration.ServerURL
	serverURL := strings.TrimSuffix(configServerURL, "/")

	createMeetingAPI := fmt.Sprintf("%s/api/rooms", serverURL)

	client := &http.Client{}
	req, err := http.NewRequest("POST", createMeetingAPI, strings.NewReader(`{
		"name": "Mattermost Plugin"
	}`))

	if err != nil {
		p.API.LogError("Failed to create http request", "error", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	req.Header.Add("x-api-key", configuration.APISecret)
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		p.API.LogError("Failed to perform request", "error", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer res.Body.Close()

	respBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		p.API.LogError("Failed to read body", "error", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Add("Content-Type", "application/json")
	w.Write(respBody)
	w.WriteHeader(http.StatusOK)
}
