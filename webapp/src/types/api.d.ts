export interface Configuration {
    ServerURL: string,
}

export interface Room {
    id: string,
    code: string,
    name: string,
    create_at: number,
    delete_at: number,
    entity_id: string,
    update_at: string,
    last_activity_at: string,
    update_at: number,
    valid_until: number
}