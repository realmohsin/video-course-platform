import { render } from '@testing-library/react'
import { Label } from '@/components/ui/label'

describe('Label Component', () => {
  it('renders basic label correctly', () => {
    const { container } = render(<Label>Basic Label</Label>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders label with htmlFor attribute', () => {
    const { container } = render(<Label htmlFor="input-id">Label for input</Label>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders label with custom className', () => {
    const { container } = render(<Label className="custom-label">Custom Label</Label>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders label with different text content', () => {
    const texts = ['Short', 'This is a longer label text', 'Required Field *']
    
    texts.forEach((text, index) => {
      const { container } = render(<Label>{text}</Label>)
      expect(container.firstChild).toMatchSnapshot(`label-text-${index}`)
    })
  })

  it('renders label with special characters', () => {
    const { container } = render(<Label>Email Address (required) *</Label>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders empty label', () => {
    const { container } = render(<Label />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
