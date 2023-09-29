import { render } from '@testing-library/react'
import { CourseCard } from '@/components/course-card'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => (
    <a href={href}>{children}</a>
  ),
}))

// Mock formatPrice function
jest.mock('@/lib/format', () => ({
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
}))

describe('CourseCard Component', () => {
  const defaultProps = {
    id: 'course-1',
    title: 'Introduction to React',
    imageUrl: '/course-image.jpg',
    chaptersLength: 5,
    price: 99.99,
    progress: null,
    category: 'Programming'
  }

  it('renders course card with price when no progress', () => {
    const { container } = render(<CourseCard {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with progress when enrolled', () => {
    const { container } = render(
      <CourseCard {...defaultProps} progress={75} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with completed progress', () => {
    const { container } = render(
      <CourseCard {...defaultProps} progress={100} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with single chapter', () => {
    const { container } = render(
      <CourseCard {...defaultProps} chaptersLength={1} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with multiple chapters', () => {
    const { container } = render(
      <CourseCard {...defaultProps} chaptersLength={12} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with long title', () => {
    const { container } = render(
      <CourseCard 
        {...defaultProps} 
        title="Complete Full-Stack Web Development Bootcamp with React, Node.js, and MongoDB"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with different category', () => {
    const { container } = render(
      <CourseCard {...defaultProps} category="Design" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with zero progress', () => {
    const { container } = render(
      <CourseCard {...defaultProps} progress={0} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course card with high price', () => {
    const { container } = render(
      <CourseCard {...defaultProps} price={299.99} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
