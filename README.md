# Password generator app

**Live Site URL:** [password-generator-rust-ten-63.vercel.app](password-generator-rust-ten-63.vercel.app)

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [User Story](#user-story)
  - [Design](#design)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Featured Code](#featured-code)
- [Setup](#setup)
- [Usage](#usage)

## Overview

### User Story

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Design

**Mobile**
<br />
<img width="566" alt="mobile" src="https://github.com/user-attachments/assets/a490892b-2c3e-4163-9f89-db6d767c57c6">

**Tablet**
<br />
<img width="562" alt="tablet" src="https://github.com/user-attachments/assets/ef56fbab-a95a-465e-b094-c48eadfda7fb">

**Desktop**
<br />
<img width="467" alt="desktop" src="https://github.com/user-attachments/assets/edcc179d-867a-4d4e-ad33-ceb39f4e2d4e">

**Active States**
<br />
<img width="556" alt="active-states" src="https://github.com/user-attachments/assets/8fcc05c2-a192-41f2-8ec6-58d147cf2a02">

## My process

### Built with

- Nuxt 3
- Vue 3
- Tailwind CSS
- Nuxt UI
- SCSS
- Iconify Icons
- Mobile-first workflow
- Semantic HTML5 markup

### Featured Code

One of the key features of this password generator is its dynamic password creation based on user-selected criteria, such as length and inclusion of character types (uppercase, lowercase, numbers, symbols).

index.vue

```js
function generatePassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

  let availableCharacters = ''
  if (form.value.includeUppercase) { availableCharacters += uppercase }
  if (form.value.includeLowercase) { availableCharacters += lowercase }
  if (form.value.includeNumbers) { availableCharacters += numbers }
  if (form.value.includeSymbols) { availableCharacters += symbols }

  // Ensure there are available characters based on selected options
  if (availableCharacters === '') {
    generatedPassword.value = 'Please select at least one character type!'
    return
  }

  let password = ''
  for (let i = 0; i < form.value.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length)
    password += availableCharacters[randomIndex]
  }

  generatedPassword.value = password
  calculateStrength(password)
}
```

This function builds the password dynamically by combining different character types based on user preferences. It then generates a password by randomly selecting characters and ensures that at least one character type is selected. Additionally, the function calculates the strength of the generated password based on its length and composition.

- Strength Meter: The password's strength is evaluated and displayed using a simple strength meter, allowing users to see the security of their generated password.
- Copy to Clipboard: Users can copy the generated password with a single click, improving the user experience.

## Setup

To get started with the Nuxt 3 Minimal Starter, first install the dependencies. Choose the package manager you prefer:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Usage

**Development Server:**

To start the development server, run the following command. Your application will be available at http://localhost:3000:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

**Production:**

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
