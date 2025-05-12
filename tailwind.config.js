/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Extend the default Tailwind theme with your custom design tokens
    extend: {
      // --- Color Tokens ---
      colors: {
        // Brand Colors (adjust names and values to your specific brand identity)
        'brand-primary': '#007bff', // Example primary brand color (if you have one)
        'brand-secondary': '#6c757d', // Example secondary brand color

        // UI Colors (based on observed colors in your screenshots)
        'ui-background': '#FFFFFF', // White background (used on most screens)
        'ui-background-alt': '#F8F8F8', // Light gray background (observed on Step 3)
        'ui-border': '#E5E5E5', // Lighter border color (e.g., for outline buttons)
        'ui-border-dark': '#D1D5DB', // Darker border color (e.g., for input fields)

        // Text Colors
        'text-primary': '#2C2C2C', // Primary dark text color (e.g., for headings, dark buttons)
        'text-secondary': '#6B7280', // Secondary gray text color (e.g., for paragraph text)
        'text-placeholder': '#9CA3AF', // Placeholder text color in inputs
        'text-white': '#FFFFFF', // White text color

        // Button Colors (example based on dark button from your design)
        'button-primary-bg': '#2C2C2C',
        'button-primary-hover-bg': '#000000',
        'button-primary-text': '#FFFFFF',
        'button-outline-border': '#E5E5E5', // Border for outline buttons
        'button-outline-hover-bg': '#F9FAFB', // Hover background for outline buttons
        'button-outline-text': '#2C2C2C', // Text color for outline buttons

        // Add other specific colors as needed (e.g., success, danger, warning colors)
      },

      // --- Spacing Tokens ---
      // Define a consistent spacing scale based on a base unit (e.g., 4px or 8px)
      // Tailwind's default is 4px based. You can extend or override.
      spacing: {
        'px': '1px',
        '0': '0',
        '0.5': '0.125rem', // 2px
        '1': '0.25rem', // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem', // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem', // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '7': '1.75rem', // 28px
        '8': '2rem', // 32px
        '9': '2.25rem', // 36px
        '10': '2.5rem', // 40px
        '11': '2.75rem', // 44px
        '12': '3rem', // 48px
        '14': '3.5rem', // 56px
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '32': '8rem', // 128px
        '40': '10rem', // 160px
        '48': '12rem', // 192px
        '56': '14rem', // 224px
        '64': '16rem', // 256px
        // Add specific spacing values observed in your design if they don't fit the scale
        'header-y': '1rem', // py-4
        'header-x': '1rem', // px-4 or px-6
        'main-pt': '3rem', // pt-12
        'main-pb': '2rem', // pb-8
        'space-y-2': '0.5rem', // space-y-2
        'space-y-3': '0.75rem', // space-y-3
        'space-y-4': '1rem', // space-y-4
        'space-y-6': '1.5rem', // space-y-6
        'space-y-8': '2rem', // space-y-8
        // Add other specific spacing names if needed
      },

      // --- Typography Tokens ---
      fontSize: {
        'xs': '0.75rem', // 12px
        'sm': '0.875rem', // 14px
        'base': '1rem', // 16px (Default body text size)
        'lg': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        // Specific sizes from your design
        'text-17px': '17px',
        'text-28px': '28px',
        'text-32px': '32px',
        // Add other specific font sizes
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300', // Used in your design
        'normal': '400',
        'medium': '500', // Used in your design
        'semibold': '600', // Used in your design (e.g., for font-heading default)
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      fontFamily: {
        // Define font families, linking names to the loaded fonts
        // Ensure these names match exactly the names used in your @font-face or Google Fonts link
        'sans': ['ui-sans-serif', 'system-ui', 'sans-serif'], // Default sans-serif (System Font)
        'heading': ['"IBM Plex Sans Thai"', '"IBM Plex Sans"', 'sans'], // Heading font family
        // Add other font families if used (e.g., 'body': ['System Font Stack', 'sans'])
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25', // Example, adjust if needed
        'snug': '1.375', // Example, adjust if needed
        'normal': '1.5', // Example, adjust if needed
        'relaxed': '1.625', // Example, adjust if needed
        'loose': '2', // Example, adjust if needed
        'tight-32px': '1.2', // Specific line height from your design (for 32px text)
        'tight-28px': '1.2', // Specific line height from your design (for 28px text)
        // Add other specific line heights
      },

      // --- Border Radius Tokens ---
      borderRadius: {
        'none': '0',
        'sm': '0.125rem', // 2px
        'md': '0.375rem', // 6px
        'lg': '0.5rem', // 8px
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
        'full': '9999px', // Full rounded (used on buttons, inputs)
        // Add other specific border radius values
      },

      // --- Other Potential Tokens (Add as needed) ---
      boxShadow: {
        // Define shadows if used in your design
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        // Add other specific shadows
      },
      // zIndex, opacity, etc.
    },
  },
  plugins: [],
}
