export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};


export const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
  
    const formattedTime = `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
  }

 export const formatAddress = (address) => {
    const addressLine1 = `${address.number} ${address.prefix_direction} ${address.name} ${address.type}`;
    const crossStreets = `Cross streets: ${address.cross_street1} and ${address.cross_street2}`;
    const cityState = `${address.city}, ${address.state}`;
    
    let summary = addressLine1;
    if (addressLine1 !== "") {
      summary += "\n";
    }
    summary += `${crossStreets}\n${cityState}`;
    
    return summary;
  }
  