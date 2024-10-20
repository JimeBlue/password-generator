<template>
  <section class="mt-16 grid place-items-center px-6 sm:px-0">
    <div class="w-full sm:w-[540px]">
      <h1 class="text-center text-lg font-bold text-topaz-500 sm:text-2xl">
        {{ $t('welcome.title') }}
      </h1>
      <!-- NOTE: Display generated password -->
      <div class="mt-10 flex items-center justify-between space-x-4 bg-topaz-800 p-5">
        <!-- password -->
        <p class="text-xl text-gray-200 sm:text-2xl md:text-3xl">
          {{ generatedPassword }}
        </p>
        <!-- Copy to clipboard button -->
        <button type="button" @click="copyToClipboard">
          <span v-if="copied" class="mr-3 text-base uppercase text-brand-500 md:text-lg">copied</span>
          <UIcon name="material-symbols:content-copy-outline-rounded" class="size-5 text-brand-500 hover:text-white md:size-7" />
        </button>
      </div>
      <!-- NOTE: form -->
      <UForm
        :state="form"
        autocomplete="off"
        class="mt-5 bg-topaz-800 p-5"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Character length -->
        <article class="space-y-5">
          <div class="mb-2 flex justify-between">
            <span class="text-lg text-gray-200">Character Length</span>
            <span class="text-3xl text-brand-500">{{ form.passwordLength }}</span>
          </div>
          <UFormGroup name="passwordLength">
            <URange
              v-model="form.passwordLength"
              :min="8"
              :max="20"
              size="md"
            />

            <div v-if="errors.passwordLength" class="mt-1 text-red-500">
              {{ errors.passwordLength }}
            </div>
          </UFormGroup>
        </article>

        <!-- Checkboxes for character type inclusion -->
        <article class="mt-10 space-y-4">
          <UFormGroup
            name="includeUppercase"
            size="lg"
          >
            <UCheckbox
              v-model="form.includeUppercase"
              label="Include Uppercase Letters"
            />
          </UFormGroup>
          <UFormGroup name="includeLowercase" size="lg">
            <UCheckbox v-model="form.includeLowercase" label="Include Lowercase Letters" />
          </UFormGroup>
          <UFormGroup name="includeNumbers" size="lg">
            <UCheckbox v-model="form.includeNumbers" label="Include Lowercase Letters" />
          </UFormGroup>
          <UFormGroup name="includeSymbols" size="lg">
            <UCheckbox v-model="form.includeSymbols" label="Include Symbols" />
          </UFormGroup>
        </article>

        <!-- Password strength meter -->
        <article class="mt-10 flex items-center justify-between bg-topaz-900 p-4 sm:px-8">
          <h3 class="text-base font-bold uppercase sm:text-lg">
            <span class="text-topaz-500">Strength</span>
          </h3>
          <div class="flex items-center space-x-2">
            <p class="text-lg uppercase text-gray-200 sm:text-xl">
              {{ passwordStrength }}
            </p>
            <ul class="flex space-x-1">
              <li class="h-6 w-4" :class="[strengthClass(1)]" />
              <li class="h-6 w-4" :class="[strengthClass(2)]" />
              <li class="h-6 w-4" :class="[strengthClass(3)]" />
              <li class="h-6 w-4" :class="[strengthClass(4)]" />
            </ul>
          </div>
        </article>
        <UButton
          type="submit"
          color="primary"
          variant="solid"
          block
          icon="ic:baseline-arrow-forward"
          trailing
          class="mt-10"
        >
          Generate
        </UButton>
      </UForm>
    </div>
  </section>
</template>

<script setup>
import { z } from 'zod'
import Swal from 'sweetalert2'

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

// New state to store the last calculated strength score
const strengthScore = ref(0)

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
    // Trigger SweetAlert2 for the error message
    Swal.fire({

      text: 'At least one character type must be selected!',
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#A4FFAF',
      customClass: {
        confirmButton: 'text-gray-900', // Add a custom class
      },

    })
  }

  return Object.keys(errors).length === 0
}

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
    generatedPassword.value = 'Please select at least one character type!'
    return
  }

  let password = ''
  for (let i = 0; i < form.value.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length)
    password += availableCharacters[randomIndex]
  }

  generatedPassword.value = password

  // After generating the password, calculate its strength
  strengthScore.value = getStrengthScore(password)
  calculateStrength(password)
}

// Reusable function to calculate the strength score of a given password
function getStrengthScore(password) {
  const length = password.length
  const hasUppercase = form.value.includeUppercase
  const hasLowercase = form.value.includeLowercase
  const hasNumbers = form.value.includeNumbers
  const hasSymbols = form.value.includeSymbols

  // Count how many character types are selected
  let selectedCharacterTypes = 0
  if (hasUppercase) { selectedCharacterTypes++ }
  if (hasLowercase) { selectedCharacterTypes++ }
  if (hasNumbers) { selectedCharacterTypes++ }
  if (hasSymbols) { selectedCharacterTypes++ }

  // Scoring criteria:
  // If only 2 character types are selected
  if (selectedCharacterTypes === 2) {
    if (length > 12) {
      // Medium strength if length > 12
      return 3 // Medium strength
    }
    else {
      // Weak strength if length <= 12
      return 1 // Weak strength
    }
  }

  // If more than 2 character types are selected
  let strengthScore = 0
  if (length >= 8) { strengthScore++ }
  if (length >= 15) { strengthScore++ }
  if (hasUppercase) { strengthScore++ }
  if (hasLowercase) { strengthScore++ }
  if (hasNumbers) { strengthScore++ }
  if (hasSymbols) { strengthScore++ }

  return strengthScore
}

// Determine strength level based on the score
function calculateStrength(password) {
  const score = strengthScore.value

  if (score <= 2) {
    passwordStrength.value = 'Weak'
  }
  else if (score <= 4) {
    passwordStrength.value = 'Medium'
  }
  else {
    passwordStrength.value = 'Strong'
  }
}

// Function to determine the tailwind class for each strength block based on score
function strengthClass(level) {
  // Get the current calculated strength score, not real-time from checkboxes
  const score = strengthScore.value

  // For weak passwords (score <= 2), fill 1-2 bars
  if (score <= 2 && level <= score) {
    return 'bg-carnation'
  }

  // For medium passwords (score <= 4), fill up to 3 bars
  if (score > 2 && score <= 4 && level <= 3) {
    return 'bg-cream'
  }

  // For strong passwords (score > 4), fill all 4 bars
  if (score > 4 && level <= 4) {
    return 'bg-brand-700'
  }

  // Any unfilled bars will be gray
  return 'bg-gray-300'
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

// Trigger default password generation when the component is mounted
onMounted(() => {
  generatePassword() // Generate the initial password
})

// Form submit handler (trigger password generation)
async function onSubmit(event) {
  if (validate(form.value)) {
    generatePassword() // Only calculate strength after generation
  }
}

// Error handler
async function onError(event) {
  console.log(event.errors)
}
</script>
