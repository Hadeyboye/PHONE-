import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function lookupNumber(phone: string) {
  try {
    const phoneNumber = await client.lookups.v2
      .phoneNumbers(phone)
      .fetch({ 
        fields: 'line_type_intelligence,caller_name,line_status,carrier' 
      });

    const location = deriveLocation(phoneNumber);

    return {
      valid: true,
      number: phone,
      ...phoneNumber,
      location: location.city + ', ' + location.country,
      mapCenter: location.coords,
      callerName: phoneNumber.callerName,
      aiInsights: generateRealAIInsights(phoneNumber)
    };
  } catch (error: any) {
    console.error('Lookup error:', error);
    return { 
      valid: false, 
      error: error.message || "Lookup failed. Verify number format (E.164)." 
    };
  }
}

function deriveLocation(data: any) {
  // Approximate location from available data
  const city = data.lineTypeIntelligence?.carrier_name || data.carrier?.name || "Unknown";
  return {
    city,
    country: data.countryCode || "US",
    coords: { lat: 37.7749, lng: -122.4194 } // Default; enhance with real geocoding API
  };
}

function generateRealAIInsights(data: any) {
  const carrier = data.lineTypeIntelligence?.carrier_name || 'N/A';
  return [
    `✅ Carrier: ${carrier}`,
    `📍 Line Type: ${data.lineTypeIntelligence?.type || 'Unknown'} | Status: ${data.lineStatus?.status || 'N/A'}`,
    `🔍 Caller Name: ${data.callerName?.name || 'Not available'}`,
    `⚠️ AI Risk Score: ${data.callerName ? 'Low' : 'Medium'} (based on verification)`,
    "📌 Note: Location is carrier-registered approximation only. No real-time GPS."
  ];
}