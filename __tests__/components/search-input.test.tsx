import { render } from '@testing-library/react'
import { SearchInput } from '@/components/search-input'

// Mock the useDebounce hook
jest.mock('@/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}))

// Mock query-string
jest.mock('query-string', () => ({
  stringifyUrl: ({ url, query }: any) => {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value) params.append(key, value as string)
    })
    const queryString = params.toString()
    return queryString ? `${url}?${queryString}` : url
  },
}))

describe('SearchInput Component', () => {
  it('renders search input correctly', () => {
    const { container } = render(<SearchInput />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders search input with search icon', () => {
    const { container } = render(<SearchInput />)
    const searchIcon = container.querySelector('svg')
    expect(searchIcon).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with correct placeholder', () => {
    const { container } = render(<SearchInput />)
    const input = container.querySelector('input')
    expect(input?.placeholder).toBe('Search for a course')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders input with correct styling classes', () => {
    const { container } = render(<SearchInput />)
    const input = container.querySelector('input')
    expect(input?.className).toContain('pl-9')
    expect(input?.className).toContain('rounded-full')
    expect(input?.className).toContain('bg-slate-100')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders container with relative positioning', () => {
    const { container } = render(<SearchInput />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper?.className).toContain('relative')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders complete search input structure', () => {
    const { container } = render(<SearchInput />)
    // Check that both icon and input are present
    const searchIcon = container.querySelector('svg')
    const input = container.querySelector('input')
    expect(searchIcon).toBeTruthy()
    expect(input).toBeTruthy()
    expect(container.firstChild).toMatchSnapshot()
  })
})
