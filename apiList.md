# Dev Tiner API's

## authRouter

- Post /signup
- Post /login
- Post /logout

## profileRouter

- Get /profile/view
- Patch /profile/edit
- Patch /profile/password

## connectionRequestRouter

- Post /request/send/interested/:userId
- Post /request/send/ignored/:userId
- Post /request/send/accepted/:userId
- Post /request/send/rejected/:userId

## userRouter

- Get /user/connections
- Get /user/requests
- Get /user/feed - gets you the profile of other users on the platform

Status: ignore, interested, accepted, rejected
