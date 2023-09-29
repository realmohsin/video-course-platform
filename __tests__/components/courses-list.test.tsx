import { render } from '@testing-library/react'
import { CoursesList } from '@/components/courses-list'

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

describe('CoursesList Component', () => {
  const mockCourse = {
    id: 'course-1',
    userId: 'user-1',
    title: 'Introduction to React',
    description: 'Learn React fundamentals',
    imageUrl: '/course-image.jpg',
    price: 99.99,
    isPublished: true,
    categoryId: 'cat-1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    progress: null,
    category: { id: 'cat-1', name: 'Programming' },
    chapters: [
      { id: 'chapter-1' },
      { id: 'chapter-2' },
      { id: 'chapter-3' }
    ]
  }

  it('renders empty courses list', () => {
    const { container } = render(<CoursesList items={[]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders single course', () => {
    const { container } = render(<CoursesList items={[mockCourse]} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders multiple courses', () => {
    const courses = [
      mockCourse,
      {
        ...mockCourse,
        id: 'course-2',
        title: 'Advanced JavaScript',
        price: 149.99,
        category: { id: 'cat-2', name: 'JavaScript' },
        chapters: [{ id: 'chapter-1' }, { id: 'chapter-2' }]
      },
      {
        ...mockCourse,
        id: 'course-3',
        title: 'Node.js Fundamentals',
        price: 79.99,
        progress: 50,
        category: { id: 'cat-3', name: 'Backend' },
        chapters: [{ id: 'chapter-1' }]
      }
    ]
    
    const { container } = render(<CoursesList items={courses} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders courses with different progress states', () => {
    const courses = [
      { ...mockCourse, progress: 0 },
      { ...mockCourse, id: 'course-2', progress: 50 },
      { ...mockCourse, id: 'course-3', progress: 100 }
    ]
    
    const { container } = render(<CoursesList items={courses} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders courses with varying chapter counts', () => {
    const courses = [
      { ...mockCourse, chapters: [{ id: 'chapter-1' }] },
      { 
        ...mockCourse, 
        id: 'course-2', 
        chapters: Array.from({ length: 10 }, (_, i) => ({ id: `chapter-${i + 1}` }))
      }
    ]
    
    const { container } = render(<CoursesList items={courses} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders courses with null category', () => {
    const courseWithNullCategory = {
      ...mockCourse,
      category: null
    }
    
    const { container } = render(<CoursesList items={[courseWithNullCategory]} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
