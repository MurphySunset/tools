# ben-v2-image

> A fast and high quality model for image background removal.


## Overview

- **Endpoint**: `https://fal.run/fal-ai/ben/v2/image`
- **Model ID**: `fal-ai/ben/v2/image`
- **Category**: image-to-image
- **Kind**: inference
**Tags**: background removal



## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.


### Input Schema

The API accepts the following input parameters:


- **`image_url`** (`string`, _required_):
  URL of image to be used for background removal
  - Examples: "https://storage.googleapis.com/falserverless/gallery/Ben2/arduino-uno-board-electronics-hand-600nw-1869855883.webp"

- **`seed`** (`integer`, _optional_):
  Random seed for reproducible generation.



**Required Parameters Example**:

```json
{
  "image_url": "https://storage.googleapis.com/falserverless/gallery/Ben2/arduino-uno-board-electronics-hand-600nw-1869855883.webp"
}
```


### Output Schema

The API returns the following output format:

- **`image`** (`Image`, _required_):
  The output image after background removal.
  - Examples: {"height":512,"file_size":423052,"file_name":"zrZNETpI_ul2jonraqpxN_a57c3f3825d9418f8b3d39cde87c3310.png","content_type":"image/png","url":"https://storage.googleapis.com/falserverless/gallery/Ben2/zrZNETpI_ul2jonraqpxN_a57c3f3825d9418f8b3d39cde87c3310.png","width":512}

- **`seed`** (`integer`, _required_):
  Seed of the generated Image. It will be the same value of the one passed in the
  input or the randomly generated that was used in case none was passed.



**Example Response**:

```json
{
  "image": {
    "height": 512,
    "file_size": 423052,
    "file_name": "zrZNETpI_ul2jonraqpxN_a57c3f3825d9418f8b3d39cde87c3310.png",
    "content_type": "image/png",
    "url": "https://storage.googleapis.com/falserverless/gallery/Ben2/zrZNETpI_ul2jonraqpxN_a57c3f3825d9418f8b3d39cde87c3310.png",
    "width": 512
  }
}
```


## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/ben/v2/image \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "image_url": "https://storage.googleapis.com/falserverless/gallery/Ben2/arduino-uno-board-electronics-hand-600nw-1869855883.webp"
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/ben/v2/image",
    arguments={
        "image_url": "https://storage.googleapis.com/falserverless/gallery/Ben2/arduino-uno-board-electronics-hand-600nw-1869855883.webp"
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/ben/v2/image", {
  input: {
    image_url: "https://storage.googleapis.com/falserverless/gallery/Ben2/arduino-uno-board-electronics-hand-600nw-1869855883.webp"
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```


## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/ben/v2/image)
- [API Documentation](https://fal.ai/models/fal-ai/ben/v2/image/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/ben/v2/image)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)
