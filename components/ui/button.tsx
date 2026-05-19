'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const base =
  'inline-flex items-center justify-center font-sans font-light tracking-[0.35em] uppercase transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer'

const variants: Record<Variant, string> = {
  gold: 'bg-[oklch(68%_0.11_82)] text-[oklch(5%_0.012_275)] hover:bg-[oklch(79%_0.13_82)]',
  outline:
    'border border-[oklch(68%_0.11_82/0.45)] text-[oklch(68%_0.11_82)] hover:bg-[oklch(68%_0.11_82)] hover:text-[oklch(5%_0.012_275)] hover:border-[oklch(68%_0.11_82)]',
  ghost:
    'text-[oklch(68%_0.11_82)] hover:bg-[oklch(68%_0.11_82/0.08)]',
}

const sizes: Record<Size, string> = {
  sm: 'text-[9px] px-8 py-3',
  md: 'text-[10px] px-12 py-4',
  lg: 'text-[10px] px-14 py-5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'outline', size = 'md', children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
