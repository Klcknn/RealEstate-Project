export const config = {
  api: {
    baseUrl: 'http://app:8092',
  },
  project: {
    name: "Prettier Homes",
    description: "An real estate website is an online platform where users can buy, sell, or rent properties such as houses, apartments, land, and commercial real estate.",
  },
  settings: {
    languages: [
      { code: 'en', name: 'English', flag: "/icons/flags/uk.png" },
      { code: 'tr', name: 'Türkçe', flag: "/icons/flags/tr.png" },
      { code: 'fr', name: 'Français', flag: "/icons/flags/fr.png" },
      { code: 'de', name: 'Deutsch', flag: "/icons/flags/de.png" },
      { code: 'es', name: 'Español', flag: "/icons/flags/es.png" }
    ],
  },
  contact: {
    center: {
      phone: "+90 (541) 123-2225",
      email: "info@prettierhomes.com",
      address: "Mecidiyekoy Yolu Cd., 34394 Sisli, Istanbul",
      mapEmbedURL: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3008.078161122501!2d28.989887403427126!3d41.067284111210085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDA0JzAyLjUiTiAyOMKwNTknMjkuNCJF!5e0!3m2!1str!2str!4v1703539988073!5m2!1str!2str",
    },
    offices: [
      {
        id: 1,
        name: "PARIS",
        address: "Rue Saint-Dominique, Paris, France",
        mapURL: "https://maps.app.goo.gl/E5pFSPHY2iqmrtjj6",
        phone: "+33 1 56 76 01 02",
        image: "paris.png"
      },
      {
        id: 2,
        name: "LONDON",
        address: "Dover St, London, UK",
        mapURL: "https://maps.app.goo.gl/EGH1F8btiDkYyB4k9",
        phone: "+44 7980 794795",
        image: "london.png"
      },
      {
        id: 3,
        name: "ISTANBUL",
        address: "Mecidiyekoy Yolu Cd., 34394 Sisli, Istanbul",
        mapURL: "https://maps.app.goo.gl/t2bXusPKPwDtSxx7A",
        phone: "+90 (541) 123-2225",
        image: "istanbul.png"
      }
    ]
  },
  pageRoles: {
    myProfile: ["ADMIN", "MANAGER", "CUSTOMER"],
    myAdverts: ["ADMIN", "MANAGER", "CUSTOMER"],
    myFavorites: ["ADMIN", "MANAGER", "CUSTOMER"],
    dashboard: ["ADMIN", "MANAGER"]
  },
  selectRoles: {
    roles: ["ADMIN", "MANAGER", "CUSTOMER"]
  },
  advertsStatus: {
    status: ["PENDING", "ACTIVATED", "REJECTED"]
  },
  tourRequestStatus: {
    status: ["PENDING", "APPROVED", "DECLINED", "CANCELED"]
  }

}