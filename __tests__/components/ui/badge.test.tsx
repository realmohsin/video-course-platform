import { render } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge Component', () => {
  it('renders default badge correctly', () => {
    const { container } = render(<Badge>Default Badge</Badge>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders badge with different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline'] as const
    
    variants.forEach(variant => {
      const { container } = render(<Badge variant={variant}>Badge {variant}</Badge>)
      expect(container.firstChild).toMatchSnapshot(`badge-variant-${variant}`)
    })
  })

  it('renders badge with custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom Badge</Badge>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders badge with no text content', () => {
    const { container } = render(<Badge />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders badge with number content', () => {
    const { container } = render(<Badge>42</Badge>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders badge with special characters', () => {
    const { container } = render(<Badge variant="destructive">⚠️ Error!</Badge>)
    expect(container.firstChild).toMatchSnapshot()
  })
})
