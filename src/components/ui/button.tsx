import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[var(--primary)] text-black hover:bg-[var(--primary)]/90 shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all duration-300",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-[var(--card-border)] bg-transparent hover:bg-[var(--card-border)] text-[var(--foreground)]",
                secondary:
                    "bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/80 shadow-[0_0_15px_rgba(112,0,255,0.5)]",
                ghost: "hover:bg-[var(--card-border)] hover:text-white",
                link: "text-primary underline-offset-4 hover:underline",
                "pulse": "bg-transparent border border-[var(--primary)] text-[var(--primary)] shadow-[0_0_10px_inset_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_inset_rgba(0,240,255,0.4)]"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
