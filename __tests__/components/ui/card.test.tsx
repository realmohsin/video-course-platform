import { render } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card Components', () => {
  it('renders basic card correctly', () => {
    const { container } = render(<Card>Basic card content</Card>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card with custom className', () => {
    const { container } = render(<Card className="custom-card">Custom card</Card>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders complete card with all components', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <p>Card footer content</p>
        </CardFooter>
      </Card>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card header separately', () => {
    const { container } = render(
      <CardHeader>
        <CardTitle>Standalone Header</CardTitle>
      </CardHeader>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card title with different content', () => {
    const { container } = render(<CardTitle>Sample Title</CardTitle>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card description', () => {
    const { container } = render(<CardDescription>Sample description text</CardDescription>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card content', () => {
    const { container } = render(<CardContent>Sample content</CardContent>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card footer', () => {
    const { container } = render(<CardFooter>Footer content</CardFooter>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders card with only header and content', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
        </CardHeader>
        <CardContent>
          Just header and content
        </CardContent>
      </Card>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
