import { render } from '@testing-library/react'
import { Separator } from '@/components/ui/separator'

describe('Separator Component', () => {
  it('renders horizontal separator correctly', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders vertical separator correctly', () => {
    const { container } = render(<Separator orientation="vertical" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders separator with different orientations', () => {
    const orientations = ['horizontal', 'vertical'] as const
    
    orientations.forEach(orientation => {
      const { container } = render(<Separator orientation={orientation} />)
      expect(container.firstChild).toMatchSnapshot(`separator-${orientation}`)
    })
  })

  it('renders separator with custom className', () => {
    const { container } = render(<Separator className="custom-separator" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders separator with decorative false', () => {
    const { container } = render(<Separator decorative={false} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders vertical separator with custom styling', () => {
    const { container } = render(<Separator orientation="vertical" className="h-20" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
