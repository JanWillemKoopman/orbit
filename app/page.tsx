import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AppScreenshotSlot from '@/components/AppScreenshotSlot'
import ProductPage from '@/components/ProductPage'
import Footer from '@/components/Footer'
export default function Page() { return <><Header /><main><div className="product-grid"><Hero /><AppScreenshotSlot label="ORBIT ENGINE resultaten" /><ProductPage /></div></main><Footer /></> }
