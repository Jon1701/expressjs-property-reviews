interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Developer {
  id: string;
  name: string;
  address: Address;
  website: string;
}

export { Developer };
