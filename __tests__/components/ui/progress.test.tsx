import { render } from '@testing-library/react'
import { Progress } from '@/components/ui/progress'

describe('Progress Component', () => {
  it('renders default progress correctly', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders progress with different variants', () => {
    const variants = ['default', 'success'] as const
    
    variants.forEach(variant => {
      const { container } = render(<Progress value={75} variant={variant} />)
      expect(container.firstChild).toMatchSnapshot(`progress-variant-${variant}`)
    })
  })

  it('renders progress with different values', () => {
    const values = [0, 25, 50, 75, 100]
    
    values.forEach(value => {
      const { container } = render(<Progress value={value} />)
      expect(container.firstChild).toMatchSnapshot(`progress-value-${value}`)
    })
  })

  it('renders progress with no value (undefined)', () => {
    const { container } = render(<Progress />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders progress with custom className', () => {
    const { container } = render(<Progress value={60} className="custom-progress" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders progress with success variant at 100%', () => {
    const { container } = render(<Progress value={100} variant="success" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders progress with decimal values', () => {
    const { container } = render(<Progress value={33.33} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
