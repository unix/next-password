<p align="center" height="370">
<img align="center" height="370" src="https://user-images.githubusercontent.com/11304944/151491082-c5cd5a37-0fff-4412-891a-bea791045824.png">
</p>
<p align="center">
<b><i>Next Password</i></b>
</p>
<p align="center">Add password protection to your Next.js application. (<code>next > v12.0.0</code>)</p>

<br /> 

> **Disclaimers**

> This project is licensed under the [BSL](./BSL.txt): **You cannot use this licensed work for any commercial purposes. (only personal & non-commercial)**. 

> For commercial purposes, use the [password protection service](https://vercel.com/docs/concepts/projects/overview#password-protection) provided by the Vercel platform.

> This is a community open source project, NOT associated with Vercel.

## Install

Run `yarn add next-password` to install.

<br/>

## Initialize

### 1. Import to middleware

Create a `_middleware.ts` file in the `/pages` directory and fill it:

```ts
// pages/_middleware.ts
import { initPasswordMiddleware } from 'next-password/middleware'

export default initPasswordMiddleware('/')
```

### 2. Create login page

Create a `auth.tsx` file in the `/pages` directory and fill it:

```tsx
// pages/auth.tsx
export { default } from 'next-password'
```

<br/>

## Add your password

### Set environment variable

The initial password for the project is `process.env.PASSWORD`, you can configure this environment variable in two ways:

- Set the [environment variables on Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- Or add envs in the `next.config.js`.

<details>
<summary>Add envs in <code>next.config.js</code></summary>

```js 
// next.config.js
module.exports = {
  env: {
    PASSWORD: 'test',
  }
});
```

</details>

### Ignore password

Skip password check in the specified environment.

<details>
<summary>Ignore password in <code>next.config.js</code></summary>

```js 
// next.config.js
// When developing locally, the env of the "VERCEL_ENV" is empty, so you can skip the password checking.
module.exports = {
  env: {
    IGNORE_PASSWORD: !process.env.VERCEL_ENV,
  }
});
```

</details>

<br/>

## Features

### Security

Whenever a user successfully enters a password (saving a persistent session), *NextPassword* will turn on `httpOnly` by default, 
which prevents most scripts from getting cookies during cross-site attacks. Also,
*NextPassword* will only store the `digest` in the `cookie`, which effectively ensures that your plaintext is not compromised.

In addition, you can also set `salt` to enhance the security of weak passwords. When `salt` is missing, *NextPassword* will generate a hash value of fixed salt.

### Edge

The implementation of *NextPassword* is based on the [Edge Functions of Vercel](https://vercel.com/docs/concepts/functions/edge-functions).
Password checking is not on the server side, but is deployed on hundreds of edge nodes around the world.
Whenever a user accesses, only the password check on the nearest edge node to the user is triggered.

The login page (`/pages/auth`) generated by *NextPassword* is completely STATIC, which means that the login page gets full client-side caches and traditional CDN node caches.

So *NextPassword* provides the most responsive password protection experience in theory, no matter how many pages you protect.

### Open design

*NextPassword's* edge function code is isolated from the client code, so they don't have to interact with each other at all.
The size of the middleware is about `3.9kb`(gzipped), Auth component are approximately `20kb`(gzipped, can be cached).

In addition, *NextPassword* supports server-side rendering styles, refer to [server-render styles](https://github.com/unix/next-password/blob/master/examples/with-server-styles).

<br/>

## Configuration

### `initPasswordMiddleware`

The `initPasswordMiddleware` function will only run in Edge Functions.

```ts
type initPasswordMiddleware = (
  path: string | string[],
  options: Options,
) => void
```

| Parameter                   | Description                                                                                                       | Type                | Default                |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------|---------------------|------------------------|
| `path`                      | Page paths, starting with `/`                                                                                     | `string` `string[]` | `/`                    |
| `options.password`          | value of password                                                                                                 | `string`            | `process.env.PASSWORD` |
| `options.maxAge`            | [expiration of cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_the_lifetime_of_a_cookie) | `number`            | `1000 * 60 * 60` (1h)  |
| `options.authComponentName` | name of the login page                                                                                            | `string`            | `auth`                 |
| `options.exactMatch`        | strict matching of path to protected pages                                                                        | `boolean`           | `false`                |
| `options.logoutPath`        | logout path                                                                                                       | `string`            | `/logout`              |
| `options.salt`              | the string used to serialize the password                                                                         | `string`            | -                      |

### Login component

You can set some props on the login component to customize the page.

<details>
<summary>Export custom login page</summary>

```js 
// pages/auth.tsx
import Login from 'next-password'

const Auth = () => (
  <Login displayProvided buttonText="go">
    <p>
      Click on <a href="">this link</a> to contact me.
    </p>
  </Login>
)
export default Auth
```

</details>

| Props             | Description                   | Type      | Default          |
|-------------------|-------------------------------|-----------|------------------|
| `dark`            | show dark mode                | `boolean` | `false`          |
| `shadow`          | shadow of login card          | `boolean` | `true`           |
| `displayProvided` | Show link to next-password    | `boolean` | `false`          |
| `warningText`     | default prompt content        | `string`  | -                |
| `forbiddenText`   | password error prompt content | `string`  | -                |
| `cardTitle`       | title of login card           | `string`  | `Authentication` |
| `pageTitle`       | title of login page           | `string`  | `Auth`           |
| `buttonText`      | text of login button          | `string`  | `Login`          |

<br/>

### Examples

- [Full example](https://github.com/unix/next-password/blob/master/examples/typescript): A complete project on NextJS for reference
- Preview: [https://pd.unix.bio](https://pd.unix.bio) (the password is `123`)

<br/>

## LICENSE

[BSL](./BSL.txt)
