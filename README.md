# Instagram Threads Web Client

<div align="center">
  
[![Docker Pulls](https://badgen.net/docker/pulls/stevenlafl/threads-web-client?icon=docker&label=pulls)](https://hub.docker.com/r/stevenlafl/threads-web-client/)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/stevenlafl/threads-web-client.svg)](http://isitmaintained.com/project/stevenlafl/threads-web-client "Average time to resolve an issue")

</div>

This project provides a desktop web client for Threads. Meta is too slow to implement, so I'm working on it. Mobile is not the best experience to work with.

## Running

```
docker run -it -p 3000:3000 stevenlafl/threads-web-client:latest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Now you are presented with a login screen. This login screen **only exchanges a username/password combination for a token** and stores it on your browser as a cookie. Subsequent requests use that cookie's token value to do everything. This has no backend storage, so any browser session will work perfectly fine. I run the one instance and have multiple people accessing it for their feeds.

You'll be presented a page like this:

<img src="https://github.com/stevenlafl/threads-web-client/assets/2539092/864eaa01-f722-49fd-8d0d-bdfcbfddac16" width="400"/>


Enter your credentials. Then you will have access to the client. Here are some screenshots (click to view larger version):

<img src="https://github.com/stevenlafl/threads-web-client/assets/2539092/c3d974b8-757c-41b9-82fa-02de50fc35ec" width="400" />

<img src="https://github.com/stevenlafl/threads-web-client/assets/2539092/6584558d-ab7f-45a7-be2c-ae44f3ab9537" width="400" />

<img src="https://github.com/stevenlafl/threads-web-client/assets/2539092/02929168-dca2-4d38-903f-9a41cd94dc86" width="400" />

<img src="https://github.com/stevenlafl/threads-web-client/assets/2539092/9e1dc7aa-0a55-495b-a0a6-e3f2e526b492" width="400" />




## Contributing

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then it's the same steps as above, minus the docker portion. Everything should behave like a standard NextJS project.

## Roadmap

Right now this just displays the regular feed with likes and reply counts. It displays images and it displays video properly.

Todo:

1. ~~View threads~~
2. ~~View replies~~
3. ~~Add posting~~
4. ~~Add replying~~
5. ~~View images~~
6. ~~View videos~~
7. ~~View quotes~~
5. ~~View repost~~
6. ~~Add liking~~
7. ~~Add reposting~~
8. Add quote posting
9. Add account switching
10. ???

### Credits

Uses NextJS and threads.js at the core

For the frontend tailwind work, this great UI by @hiravesonali

https://tailwindcomponents.com/component/twitter-clone
