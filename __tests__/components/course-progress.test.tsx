import { render } from '@testing-library/react'
import { CourseProgress } from '@/components/course-progress'

describe('CourseProgress Component', () => {
  it('renders default course progress correctly', () => {
    const { container } = render(<CourseProgress value={50} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course progress with different variants', () => {
    const variants = ['default', 'success'] as const
    
    variants.forEach(variant => {
      const { container } = render(<CourseProgress value={75} variant={variant} />)
      expect(container.firstChild).toMatchSnapshot(`course-progress-variant-${variant}`)
    })
  })

  it('renders course progress with different sizes', () => {
    const sizes = ['default', 'sm'] as const
    
    sizes.forEach(size => {
      const { container } = render(<CourseProgress value={60} size={size} />)
      expect(container.firstChild).toMatchSnapshot(`course-progress-size-${size}`)
    })
  })

  it('renders course progress with different values', () => {
    const values = [0, 25, 50, 75, 100]
    
    values.forEach(value => {
      const { container } = render(<CourseProgress value={value} />)
      expect(container.firstChild).toMatchSnapshot(`course-progress-value-${value}`)
    })
  })

  it('renders completed course progress', () => {
    const { container } = render(<CourseProgress value={100} variant="success" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course progress with decimal values', () => {
    const { container } = render(<CourseProgress value={33.7} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders course progress with combined variant and size', () => {
    const { container } = render(<CourseProgress value={85} variant="success" size="sm" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
