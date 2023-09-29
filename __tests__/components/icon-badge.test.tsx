import { render } from '@testing-library/react'
import { BookOpen, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'

describe('IconBadge Component', () => {
  it('renders default icon badge correctly', () => {
    const { container } = render(<IconBadge icon={BookOpen} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders icon badge with different variants', () => {
    const variants = ['default', 'success'] as const
    
    variants.forEach(variant => {
      const { container } = render(<IconBadge icon={CheckCircle} variant={variant} />)
      expect(container.firstChild).toMatchSnapshot(`icon-badge-variant-${variant}`)
    })
  })

  it('renders icon badge with different sizes', () => {
    const sizes = ['default', 'sm'] as const
    
    sizes.forEach(size => {
      const { container } = render(<IconBadge icon={Star} size={size} />)
      expect(container.firstChild).toMatchSnapshot(`icon-badge-size-${size}`)
    })
  })

  it('renders icon badge with different icons', () => {
    const icons = [
      { icon: BookOpen, name: 'book-open' },
      { icon: CheckCircle, name: 'check-circle' },
      { icon: AlertTriangle, name: 'alert-triangle' },
      { icon: Star, name: 'star' }
    ]
    
    icons.forEach(({ icon, name }) => {
      const { container } = render(<IconBadge icon={icon} />)
      expect(container.firstChild).toMatchSnapshot(`icon-badge-icon-${name}`)
    })
  })

  it('renders icon badge with combined variant and size', () => {
    const { container } = render(<IconBadge icon={CheckCircle} variant="success" size="sm" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
