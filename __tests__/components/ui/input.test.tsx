import { render } from '@testing-library/react'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('renders default input correctly', () => {
    const { container } = render(<Input />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with different types', () => {
    const types = ['text', 'email', 'password', 'number', 'search'] as const
    
    types.forEach(type => {
      const { container } = render(<Input type={type} />)
      expect(container.firstChild).toMatchSnapshot(`input-type-${type}`)
    })
  })

  it('renders input with placeholder', () => {
    const { container } = render(<Input placeholder="Enter your name..." />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with value', () => {
    const { container } = render(<Input value="Test value" readOnly />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders disabled input', () => {
    const { container } = render(<Input disabled placeholder="Disabled input" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with custom className', () => {
    const { container } = render(<Input className="custom-input-class" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with required attribute', () => {
    const { container } = render(<Input required placeholder="Required field" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
