import headerStyles from "./header.module.scss";
import Link from 'next/link';
const Header = props =>{
console.log('props',props);

return (
<header className={headerStyles.siteheader}>
  <a href="#0" className={headerStyles.logo}>Logo</a>
  
  <nav className={headerStyles.sitenav}>
    <ul>
      <li className="active"><Link href="/">Home</Link></li>
      
    </ul>
  </nav>
  
  <div className={headerStyles.actions}>
    <a href="#0" className={headerStyles.signoutlink}>Sign Out</a>
  </div>
  </header>
)}
export default Header
