import Link from 'next/link'

type ConditionalLinkProps = {
  condition: boolean
  href: string
  children: React.ReactNode
  className?: string
}

export default function ConditionalLink({
  condition,
  href,
  children,
  className = ''
}: ConditionalLinkProps) {
  if (condition) {
    return <span className={className}>{children}</span>
  }

  return (
    <Link href={href} passHref className={className}>
      {children}
    </Link>
  )
}
