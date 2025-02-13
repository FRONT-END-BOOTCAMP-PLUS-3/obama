export const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
  
    if (localPart.length <= 3) {
      return `${localPart.replace(/./g, "*")}@${domain}`;
    }
  
    const visiblePart = localPart.slice(0, 3);
    const maskedPart = "*".repeat(localPart.length - 3);
    
    return `${visiblePart}${maskedPart}@${domain}`;
  };