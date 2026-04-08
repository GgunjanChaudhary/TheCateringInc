// TODO: update prices and dish details once Chef Gautam confirms final menu

export const menuCategories = ['Vegetarian', 'Non-Vegetarian', 'Jain & Vegan', 'Beverages & Desserts']

export const menus = {
  Vegetarian: {
    Starters: [
      { id: 'v1', name: 'Paneer Tikka', description: 'Cottage cheese marinated in saffron yoghurt, char-grilled in the tandoor. Served with mint chutney and pickled onion.' },
      { id: 'v2', name: 'Hara Bhara Kabab', description: 'Spinach, green peas and potato patties, bound with fresh coriander and roasted spices. Crisp outside, yielding within.' },
      { id: 'v3', name: 'Dahi Ke Sholay', description: 'Hung curd with mild spices, encased in a golden crumb. A cool interior against a warm, crisp shell.' },
      { id: 'v4', name: 'Corn and Cheese Quesadilla', description: 'Freshly made flour tortillas filled with sweet corn, three-cheese blend and herbs. A live counter favourite.' },
      { id: 'v5', name: 'Stuffed Mushroom Crostini', description: 'Button mushrooms filled with sun-dried tomato and cream cheese, toasted on artisan bread.' },
      { id: 'v6', name: 'Aloo Chaat — Live Counter', description: 'Crispy potato cubes, tamarind chutney, whipped yoghurt, pomegranate seeds — assembled fresh at the station.' },
    ],
    'Main Course': [
      { id: 'v7', name: 'Dal Makhani', description: 'Whole black lentils slow-cooked overnight with tomato, cream and butter. The cornerstone of every Indian feast.' },
      { id: 'v8', name: 'Shahi Paneer', description: 'Cottage cheese in a royal cashew and tomato gravy, finished with saffron cream. Rich, fragrant, ceremonial.' },
      { id: 'v9', name: 'Palak Corn', description: 'Fresh spinach purée with sweet corn kernels and a touch of cream. Vibrant, nourishing, beautifully green.' },
      { id: 'v10', name: 'Dum Aloo Kashmiri', description: 'Baby potatoes braised in a saffron-laced Kashmiri gravy. Warming spices, gentle heat, deep flavour.' },
    ],
    Breads: [
      { id: 'v11', name: 'Tandoori Roti', description: 'Whole wheat bread, baked fresh in the clay oven throughout service.' },
      { id: 'v12', name: 'Butter Naan', description: 'Leavened bread, charred and blistered from the tandoor, finished with cultured butter.' },
      { id: 'v13', name: 'Lachha Paratha', description: 'Layered whole wheat flatbread, flaky and buttery — pairs beautifully with any curry.' },
    ],
    Rice: [
      { id: 'v14', name: 'Vegetable Biryani', description: 'Basmati rice layered with seasonal vegetables, saffron and fried onion. Sealed and slow-cooked to trap every note of fragrance.' },
      { id: 'v15', name: 'Jeera Rice', description: 'Long grain basmati tempered with cumin. Simple, aromatic, the perfect base.' },
    ],
    Desserts: [
      { id: 'v16', name: 'Gulab Jamun', description: 'Khoya dumplings, fried to a deep mahogany, soaked in rose and cardamom syrup. Served warm.' },
      { id: 'v17', name: 'Mango Phirni', description: 'Ground rice simmered in full-fat milk with Alphonso mango purée and saffron. Set and chilled in earthen cups.' },
      { id: 'v18', name: 'Assorted Indian Mithai', description: 'A curated selection of seasonal sweets — kaju katli, barfi, halwa and more — arranged as a display.' },
    ],
  },
  'Non-Vegetarian': {
    Starters: [
      { id: 'nv1', name: 'Murgh Malai Tikka', description: 'Chicken breast marinated in cream cheese, green cardamom and mace. Cooked to a pale, ivory perfection in the tandoor.' },
      { id: 'nv2', name: 'Seekh Kebab', description: 'Hand-minced lamb with fresh ginger, chilli and coriander, shaped on skewers and grilled over live charcoal.' },
      { id: 'nv3', name: 'Churrasco BBQ', description: 'Marinated chicken and lamb cuts, slow-grilled Churrasco-style. Best paired with chimichurri and warm bread.' },
      { id: 'nv4', name: 'Sushi & Dimsum — Live Counter', description: 'Hand-rolled sushi and steamed dimsums prepared fresh at the station by a dedicated chef.' },
    ],
    'Main Course': [
      { id: 'nv5', name: 'Rogan Josh', description: 'Slow-braised lamb in a Kashmiri gravy of whole spices, Kashmiri chillies and yoghurt. A masterwork of restraint.' },
      { id: 'nv6', name: 'Butter Chicken', description: 'Tandoor-roasted chicken in a silken tomato and butter gravy, finished with fenugreek cream. Beloved by every table.' },
      { id: 'nv7', name: 'Murgh Handi', description: 'Chicken braised in a clay pot with onion, tomato and whole spices. Rustic, smoky, deeply satisfying.' },
      { id: 'nv8', name: 'Chicken Biryani', description: 'Whole chicken pieces layered with saffron rice, fried onion and fresh mint. Sealed and finished in the dum — every grain fragrant.' },
    ],
    Desserts: [
      { id: 'nv9', name: 'Sponge Rasgulla', description: 'Chenna dumplings, cooked light and airy in a delicate rose syrup. A celebration in every bite.' },
      { id: 'nv10', name: 'Chocolate Mousse', description: 'Dark Belgian chocolate, folded with cream and set in individual glasses. Elegant, rich, restrained.' },
    ],
  },
  'Jain & Vegan': {
    Starters: [
      { id: 'j1', name: 'Farali Pattice', description: 'Crisp potato and chestnut flour cakes, Jain-compliant — no onion, no garlic, no root vegetables. Served with green coconut chutney.' },
      { id: 'j2', name: 'Dry Fruit Kofta', description: 'Cashew and dried fruit balls in a rich tomato cashew gravy — no onion, no garlic. Opulent, celebratory, Jain-approved.' },
    ],
    'Main Course': [
      { id: 'j3', name: 'Jain Dal Tadka', description: 'Yellow lentils tempered with cumin, dried red chilli and hing — no onion, no garlic. Pure, satisfying, aromatic.' },
      { id: 'j4', name: 'Vegan Pumpkin Curry', description: 'Kabocha pumpkin in a coconut and tomato broth with curry leaf and mustard. Entirely plant-based, dairy-free.' },
      { id: 'j5', name: 'Tofu Palak', description: 'Silken tofu in a bright spinach gravy, finished with a tempering of cumin and dried chilli. Vegan, Jain-adaptable.' },
    ],
    Desserts: [
      { id: 'j6', name: 'Fruit and Nut Halwa', description: 'Semolina cooked in ghee with dates, raisins and a medley of nuts. Rich, warming, Jain-compliant.' },
    ],
  },
  'Beverages & Desserts': {
    Beverages: [
      { id: 'b1', name: 'Spear Mint Mojito', description: 'Fresh spearmint, lime juice and soda — a bright, refreshing welcome drink. Non-alcoholic.' },
      { id: 'b2', name: 'Aam Panna', description: 'Raw mango, roasted cumin and black salt — cooling, tangy, quintessentially Indian summer.' },
      { id: 'b3', name: 'Rose Lassi', description: 'Thick yoghurt churned with rose water and a thread of saffron. Indulgent, cooling, celebratory.' },
      { id: 'b4', name: 'Masala Chai Station', description: 'A live chai counter with freshly brewed spiced tea — ginger, cardamom, cinnamon — poured to order.' },
    ],
    Desserts: [
      { id: 'b5', name: 'Macarons', description: 'French almond meringue shells in seasonal flavours — pistachio, rose, saffron, dark chocolate.' },
      { id: 'b6', name: 'Fruit Pizza', description: 'A sweet cream cheese base on a sugar cookie crust, topped with seasonal tropical fruits.' },
      { id: 'b7', name: 'Mashtini', description: 'Mashed potato dollops in martini glasses, layered with flavours of your choice. Shaken, not stirred.' },
      { id: 'b8', name: 'Dessert Table', description: 'A curated spread of miniature desserts — tartlets, petit fours, chocolate barks and Indian mithai — styled as a centrepiece.' },
    ],
  },
}
