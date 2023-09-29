import { render } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders default button correctly', () => {
    const { container } = render(<Button>Click me</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders button with different variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'success'] as const
    
    variants.forEach(variant => {
      const { container } = render(<Button variant={variant}>Button {variant}</Button>)
      expect(container.firstChild).toMatchSnapshot(`button-variant-${variant}`)
    })
  })

  it('renders button with different sizes', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const
    
    sizes.forEach(size => {
      const { container } = render(<Button size={size}>Button {size}</Button>)
      expect(container.firstChild).toMatchSnapshot(`button-size-${size}`)
    })
  })

  it('renders disabled button', () => {
    const { container } = render(<Button disabled>Disabled Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders button with custom className', () => {
    const { container } = render(<Button className="custom-class">Custom Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders button as child component', () => {
    const { container } = render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
