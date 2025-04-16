import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function to format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount)
}

// Utility function to format date
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-IN', options)
}

// Utility for API error handling
export function handleApiError(error) {
  console.error('API Error:', error)
  return {
    error: error.message || 'An unexpected error occurred',
    status: error.status || 500
  }
}