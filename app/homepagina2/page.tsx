import { redirect } from 'next/navigation'

// Wie /homepagina2 typt, komt op de tweede testhomepage.
export default function Homepagina2() {
  redirect('/homepage2')
}
