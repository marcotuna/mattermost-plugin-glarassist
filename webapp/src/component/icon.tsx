import React from 'react'

export const IconMeet = () => <i className='icon fa fa-video-camera'/>;
export const IconHeadphones = () => <i className='icon fa fa-headphones'/>;
export const IconGlartek = (style?: React.CSSProperties) => {
    return (
        <img alt="Glartek" style={style} src="data:image/webp;base64,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" />
    )
}
export const IconGlarAssist = (style?: React.CSSProperties) => {
    return (
        <img alt="GlarAssist" style={style} src="data:image/webp;base64,UklGRu4DAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSKwAAAABcFNr29O8KeOv4Pfww5pmBAPISU82tnQhvatgBAFwevneKIgIRm7bRqKms88x8wjUpN3NL0gi/7x2FAT1DkldsWc36S6Sxsb1rG8i6GVqjMJEVDiqnudLuFnlL76JuG+3sEiIFgB6CVUPOHAO0AmZdlnuibX5sX4BK0joInr5LP/Muq1Za4flqJgTK3gcD7A5NoAxY4yil9wLJUY+F4aeK3ou2bn+23+B/q8AVlA4IBwDAABQEwCdASogACAAAAAAJbACdMoRwN4x+Jv63f0nnz+EO42HhfmfxV3SL7AOAB+yX9V9v/0AeST1gHoAeVp+s3wJ/tP/u/6N8AH60Up36B+I/7O5cN6/nCf7V+PGSk/rn5AapR/Xfy35gbvL1Cv4n/XPyA/wHwt/2Hk1+c/917gH8S/kv9e/KD/Af/rlAP0rE1RVNUT5JQWIXDfZOBOgkCkWIeEAAP4UrEGZxYyqSepbYHy6LBRi7YSn6KeHOV5ibRDqskM6ErG+N4gruUcFpxkwbn/41bgOZNL/8tXTwqa58ff2RhX/St+pogqt3S4xB7/RfuUj74EM4dYsQ4D+cuM0+T1/CwGr/yaQQYsz/+NTsDAYe+OplDLw0vTF4gNr/QsRu/5UQmws//7wwKuzuHZYqU6Ukb9b/d0PylPOBq4/V73w//Dda8Fqv3wX/NSJOyx+eC4cO/VM94kV/vUSv3uU+uj9hKqE9pSWCi8lYZ9+ZHcSf9wSe/AVPzP23cye+OMuIyz+Y58faF9BdQhSq9d8YQICphCOfphdhBPwp//5D0NlL7nLd+qE5ZGWSIbhz9u595bJjl/dR/+beGmfPFi+meaQ+dZf+LNn94ojSHYVoVBRXa+dPS4pseXa4m1+T+74Lnf+Sqbu750USrVxcyR5clCmzhnR1d5Yu75X4xkFaU0i1/hL25u5UnxFHIYPQBeuqj5rV++f57fgH8rWYcOt/2w/vxjMl5vXPIrzFb8rL1HBBYUCnWKw3cJcZCVW9MFUJCSxt4mFWDTkf/rOzAWs0HkqwQtqtZzdlWiDjeYhtRi3oVSfgiyeTOYgN9k//+1pCX8GbX9ZG5PlVbZkEyWqxAbvBXjDwIrL7va2PysFzIHKs5pMqvLe1sVn+1QDsu93EQUX8RVxEV1lvgqyHLy3DRBoiDBbz/4tUhYfaFkOmch3f/7Z3zWn2zlgl+/k7kV/RxGvkvwt/1/5Gtwk9Nnon14hGdkuq/kQGPuMe9jBbhHFexzniU7w3Ubah9g/GpazZpcrF8z5FMMzFzU5kbsLEzRDHj49zPJdwAAA" />
    )
}