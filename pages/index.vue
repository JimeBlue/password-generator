<template>
  <section class="py-10">
    <div class="container">
      <h1 class="text-2xl font-bold text-brand-500">
        {{ $t('welcome.title') }}
      </h1>
      <UForm
        :state="form"
        autocomplete="off"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Character length label and value -->
        <div class="mb-2 flex justify-between">
          <span>Character Length</span>
          <span>{{ form.passwordLength }}</span>
        </div>

        <!-- Character length slider -->
        <UFormGroup name="passwordLength">
          <URange v-model="form.passwordLength" :min="8" :max="20" />
          <div v-if="errors.passwordLength" class="mt-1 text-red-500">
            {{ errors.passwordLength }}
          </div>
        </UFormGroup>

        <!-- Checkboxes for character type inclusion -->
        <UFormGroup label="Include Uppercase Letters" name="includeUppercase">
          <UCheckbox v-model="form.includeUppercase" />
        </UFormGroup>

        <UFormGroup label="Include Lowercase Letters" name="includeLowercase">
          <UCheckbox v-model="form.includeLowercase" />
        </UFormGroup>

        <UFormGroup label="Include Numbers" name="includeNumbers">
          <UCheckbox v-model="form.includeNumbers" />
        </UFormGroup>

        <UFormGroup label="Include Symbols" name="includeSymbols">
          <UCheckbox v-model="form.includeSymbols" />
        </UFormGroup>

        <!-- Show validation error if no character types are selected -->
        <div v-if="errors.characterTypes" class="mt-2 text-red-500">
          {{ errors.characterTypes }}
        </div>

        <UButton type="submit">
          Generate
        </UButton>

        <!-- Display generated password and its strength -->
        <div v-if="generatedPassword" class="mt-4 ">
          <div class="flex items-center space-x-4">
            <div>
              <h2 class="text-lg font-bold">
                Generated Password:
              </h2>
              <p class="font-mono text-brand-500">
                {{ generatedPassword }}
              </p>
            </div>
            <!-- Copy to clipboard button -->
            <button type="button" class="ml-4 text-brand-500 hover:text-brand-700" @click="copyToClipboard">
              <UIcon name="material-symbols:content-copy-outline-rounded" />
              <span v-if="copied">COPIED</span>
            </button>
          </div>
          <br>
          <h3 class="mt-2 text-lg font-bold">
            Strength: {{ passwordStrength }}
          </h3>
        </div>
      </UForm>
    </div>
  </section>
</template>

<script setup>
import { z } from 'zod'

// Form state object
const form = ref({
  passwordLength: 12,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
})

// Store the generated password and its strength
const generatedPassword = ref('')
const passwordStrength = ref('')

// State to track whether the password is copied
const copied = ref(false)

// Reactive errors object to store validation errors
const errors = reactive({})

// Zod schema for basic validation
const zodSchema = z.object({
  passwordLength: z.number().min(8, 'Password must be at least 8 characters').max(20, 'Password cannot exceed 20 characters'),
  includeUppercase: z.boolean(),
  includeLowercase: z.boolean(),
  includeNumbers: z.boolean(),
  includeSymbols: z.boolean(),
})

// Custom validation logic
function validate(state) {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  // Validate with Zod
  const result = zodSchema.safeParse(state)

  if (!result.success) {
    result.error.errors.forEach((error) => {
      errors[error.path.join('.')] = error.message
    })
  }

  // Additional custom validation: ensure at least one checkbox is selected
  if (!state.includeUppercase && !state.includeLowercase && !state.includeNumbers && !state.includeSymbols) {
    errors.characterTypes = 'At least one character type must be selected'
  }

  return Object.keys(errors).length === 0
}

// Watch for changes in checkbox values to clear the character type error
watch(
  () => [form.value.includeUppercase, form.value.includeLowercase, form.value.includeNumbers, form.value.includeSymbols],
  (newValues) => {
    if (newValues.some(value => value)) {
      delete errors.characterTypes
    }
    else {
      errors.characterTypes = 'At least one character type must be selected'
    }
  },
)

// Function to generate the password
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
    generatedPassword.value = 'Please select at least one option'
    return
  }

  let password = ''
  for (let i = 0; i < form.value.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length)
    password += availableCharacters[randomIndex]
  }

  generatedPassword.value = password

  // After generating the password, calculate its strength
  calculateStrength(password)
}

function calculateStrength(password) {
  const length = password.length
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)

  // Basic scoring criteria
  let strengthScore = 0
  if (length >= 8) { strengthScore++ }
  if (length >= 15) { strengthScore++ }
  if (hasUppercase) { strengthScore++ }
  if (hasLowercase) { strengthScore++ }
  if (hasNumbers) { strengthScore++ }
  if (hasSymbols) { strengthScore++ }

  // Determine strength level based on the score
  if (strengthScore <= 2) {
    passwordStrength.value = 'Weak'
  }
  else if (strengthScore <= 4) {
    passwordStrength.value = 'Medium'
  }
  else {
    passwordStrength.value = 'Strong'
  }
}

// Function to copy generated password to clipboard
function copyToClipboard() {
  if (generatedPassword.value) {
    navigator.clipboard.writeText(generatedPassword.value)
      .then(() => {
        copied.value = true // Set copied to true when successful
        console.log('Password copied to clipboard')

        // Reset the copied status after a delay (e.g., 2 seconds)
        setTimeout(() => {
          copied.value = false
        }, 2000)
      })
      .catch((err) => {
        console.error('Failed to copy password: ', err)
      })
  }
}

// Form submit handler (trigger password generation)
async function onSubmit(event) {
  if (validate(form.value)) {
    generatePassword()
  }
}

// Error handler
async function onError(event) {
  console.log(event.errors)
}
</script>
