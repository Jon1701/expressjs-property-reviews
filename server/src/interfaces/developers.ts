interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface Developer {
  id?: string;
  name?: string;
  address?: Address;
  website?: string;
}

// Defines the fields used by the Developer model.
interface DeveloperModel {
  developerID?: string;
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressCity?: string;
  addressState?: string;
  addressPostalCode?: string;
  addressCountry?: string;
  website?: string;
}

export { Developer, DeveloperModel };
