import { render } from '@testing-library/react'
import { Banner } from '@/components/banner'

describe('Banner Component', () => {
  it('renders warning banner correctly', () => {
    const { container } = render(<Banner label="This is a warning message" variant="warning" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders success banner correctly', () => {
    const { container } = render(<Banner label="This is a success message" variant="success" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders banner with default variant when no variant specified', () => {
    const { container } = render(<Banner label="Default banner message" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders banner with long text content', () => {
    const longText = "This is a very long banner message that should wrap properly and maintain its styling across multiple lines of text content."
    const { container } = render(<Banner label={longText} variant="warning" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders banner with special characters', () => {
    const { container } = render(<Banner label="Special chars: !@#$%^&*()_+" variant="success" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
