interface IMainProps {
  children: React.ReactNode
}

function Main({ children }: IMainProps) {
  return <main className="container mx-auto p-4">{children}</main>
}

export { Main }