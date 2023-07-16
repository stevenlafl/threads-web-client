import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useChangePath = (callback: () => void) => {

  const [oldPathname, setOldPathname] = useState<string | null>(null);
  
  const pathname = usePathname()
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) {
      return;
    }
    
    callback();
  };

  useEffect(() => {
    if (pathname !== oldPathname) {
      callback();
    }
    setOldPathname(pathname);
  }, [pathname]);
}

export default useChangePath;