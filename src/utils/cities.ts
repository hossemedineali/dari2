export interface MygovernorateType {
    value?:string
    ,label:string,
    gov?:string,
    position?:[number,number]
}


export interface MyType {
    [key: string]: MygovernorateType[];
}





export const cities: MyType  ={
    //A
   'Ariana':[{value:'ariana',label:'Ariana',position:[36.806496,10.181532],gov:'Ariana'},{value:'ettadhamen-Mnihla',label: 'Ettadhamen-Mnihla',position:[36.806496,10.181532],gov:'Ariana'}, {value:'kalàt el-Andalous',label:'Kalàt el-Andalous',position:[36.806496,10.181532],gov:'Ariana'},{value:'la Soukra',label:'La Soukra',position:[36.806496,10.181532],gov:'Ariana'},{value:'raoued',label:'Raoued',position:[36.806496,10.181532],gov:'Ariana'}, {value:'sidi Thabet',label:'Sidi Thabet',position:[36.806496,10.181532],gov:'Ariana'}],
    //B
    'Ben Arous':[{value:'ben arous',label:'Ben Arous',position:[36.806496,10.181532],gov:'Ben Arous'}, {value:'bou mhel el-bassatine',label:'Bou Mhel el-Bassatine',position:[36.806496,10.181532],gov:'Ben Arous'},{value:'ezzahra',label:'Ezzahra',position:[36.806496,10.181532],gov:'Ben Arous'},{value:'el mourouj',label:'El Mourouj',position:[36.806496,10.181532],gov:'Ben Arous'},{value:'hammam chott',label:'Hammam Chott',position:[36.806496,10.181532],gov:'Ben Arous'},{value:'hammam lif',label:'Hammam Lif',position:[36.806496,10.181532],gov:'Ben Arous'},{value: 'khalidia',label:'Khalidia',position:[36.806496,10.181532],gov:'Ben Arous'}, {value:'megrine',label:'Mégrine',position:[36.806496,10.181532],gov:'Ben Arous'}, {value:'mohamedia-fouchana',label:'Mohamedia-Fouchana',position:[36.806496,10.181532],gov:'Ben Arous'},{value:'mornag',label:'Mornag',position:[36.806496,10.181532],gov:'Ben Arous'} ,{value:'rades',label:'Radès',position:[36.806496,10.181532],gov:'Ben Arous'}],
    
    
    'Béja':[{value:'béja',label:'Béja',position:[36.806496,10.181532],gov:'Béja'},{value:'el maagoula',label:'El Maâgoula',position:[36.806496,10.181532],gov:'Béja'},{value:'goubellat',label:'Goubellat',position:[36.806496,10.181532],gov:'Béja'},{value:'majaz al bab',label:'Majaz al Bab',position:[36.806496,10.181532],gov:'Béja'},{value:'nefza',label:'Nefza',position:[36.806496,10.181532],gov:'Béja'},{value:'testour',label:'Testour',position:[36.806496,10.181532],gov:'Béja'},{value:'teboursouk',label:'Téboursouk',position:[36.806496,10.181532],gov:'Béja'},{value:'zahret medien',label:'ahret Medien',position:[36.806496,10.181532],gov:'Béja'}],
  
    'Bizerte':[{value:'Bizerte',label:'Bizerte',position:[36.806496,10.181532]},{value:'Aousj',label:'Aousj',position:[36.806496,10.181532]},{value:'El Alia',label:'El Alia',position:[36.806496,10.181532]},{value:'Ghar al Mil',label:'Ghar al Mil',position:[36.806496,10.181532]},{value:'Sejnan',label:'Sejnan',position:[36.806496,10.181532]},{value:'Mateur',label:'Mateur',position:[36.806496,10.181532]},{value:'Menzel Abderrahmane',label:'Menzel Abderrahmane',position:[36.806496,10.181532]},{value:'Menzel Bourguiba',label:'Menzel Bourguiba',position:[36.806496,10.181532]},{value:'Menzel Jemil',label:'Menzel Jemil',position:[36.806496,10.181532]},{value:'Metlin',label:'Metlin',position:[36.806496,10.181532]},{value:'Raf Raf',label:'Raf Raf',position:[36.806496,10.181532]}, {value:'Ras Jebel',label:'Ras Jebel',position:[36.806496,10.181532]},{value:'Tinja',label:'Tinja',position:[36.806496,10.181532]}],
    //G
    'Gabès':[{value:'Gabès',label:'Gabès',position:[36.806496,10.181532]},{value:'Chenini Nahal',label:'Chenini Nahal',position:[36.806496,10.181532]},{value:'El Hamma',label:'El Hamma',position:[36.806496,10.181532]},{value:'Ghannouch',label:'Ghannouch',position:[36.806496,10.181532]},{value:'Mareth',label:'Mareth',position:[36.806496,10.181532]},{value:'Matmata',label:'Matmata',position:[36.806496,10.181532]},{value:'Métouia',label:'Métouia',position:[36.806496,10.181532]},{value:'Nouvelle Matmata',label:'Nouvelle Matmata',position:[36.806496,10.181532]},{value:'Oudhref',label:'Oudhref',position:[36.806496,10.181532]},{value:'Zarat',label:'Zarat',position:[36.806496,10.181532]}],   
    'Gafsa':[{value:'Gafsa',label:'Gafsa',position:[36.806496,10.181532]},{value:'El Guettar',label:'El Guettar',position:[36.806496,10.181532]},{value:'El Ksar',label:'El Ksar',position:[36.806496,10.181532]},{value:'Mdhila',label:'Mdhila',position:[36.806496,10.181532]},{value:'Métlaoui',label:'Métlaoui',position:[36.806496,10.181532]},{value:'Moularès',label:'Moularès',position:[36.806496,10.181532]},{value:'Redeyef',label:'Redeyef',position:[36.806496,10.181532]},{value:'Sened',label:'Sened',position:[36.806496,10.181532]},{value:'sidi Aich',label:'sidi Aich',position:[36.806496,10.181532]},{value:'Sidi Boubaker',label:'Sidi Boubaker',position:[36.806496,10.181532]}],
    //J
    'Jendouba':[{value:'Jendouba',label:'Jendouba',position:[36.806496,10.181532]},{value:'Aïn Draham',label:'Aïn Draham',position:[36.806496,10.181532]},{value:"Beni M'Tir",label:"Beni M'Tir",position:[36.806496,10.181532]},{value:'Bou Salem',label:'Bou Salem',position:[36.806496,10.181532]},{value:'Fernana',label:'Fernana',position:[36.806496,10.181532]},{value:'Ghardimaou',label:'Ghardimaou',position:[36.806496,10.181532]},{value:'Oued Melliz',label:'Oued Melliz',position:[36.806496,10.181532]},{value:'Tabarka',label:'Tabarka',position:[36.806496,10.181532]}],
    //K
    'Kairouan':[{value:'Kairouan',label:'Kairouan',position:[36.806496,10.181532]},{value:'Aïn Djeloula',label:'Aïn Djeloula',position:[36.806496,10.181532]},{value:'Alaâ',label:'Alaâ',position:[36.806496,10.181532]},{value:'Bou Hajla',label:'Bou Hajla',position:[36.806496,10.181532]},{value:'Chebika',label:'Chebika',position:[36.806496,10.181532]},{value:'Echrarda',label:'Echrarda',position:[36.806496,10.181532]},{value:'Haffouz',label:'Haffouz',position:[36.806496,10.181532]},{value:'Hajeb El Ayoun',label:'Hajeb El Ayoun',position:[36.806496,10.181532]},{value:'Menzel Mehiri',label:'Menzel Mehiri',position:[36.806496,10.181532]},{value:'Nasrallah',label:'Nasrallah',position:[36.806496,10.181532]},{value:'Oueslatia',label:'Oueslatia',position:[36.806496,10.181532]},{value:'Sbikha',label:'Sbikha',position:[36.806496,10.181532]}],   
    
    
    'Kasserine':[{value:'Kasserine',label:'Kasserine',position:[36.806496,10.181532]},{value:'Fériana',label:'Fériana',position:[36.806496,10.181532]},{value:'Foussana',label:'Foussana',position:[36.806496,10.181532]},{value:'Haïdra',label:'Haïdra',position:[36.806496,10.181532]},{value:'Jedelienne',label:'Jedelienne',position:[36.806496,10.181532]},{value:'Magel Bel Abbès',label:'Magel Bel Abbès',position:[36.806496,10.181532]},{value:'Sbeitla',label:'Sbeitla',position:[36.806496,10.181532]},{value:'Sbiba',label:'Sbiba',position:[36.806496,10.181532]},{value:'Thélepte',label:'Thélepte',position:[36.806496,10.181532]},{value:'Thala',label:'Thala',position:[36.806496,10.181532]}],   
    'Kebili':[{value:'Kebil',label:'Kebil',position:[36.806496,10.181532]},{value:'Douz',label:'Douz',position:[36.806496,10.181532]},{value:'Djem',label:'Djem',position:[36.806496,10.181532]},{value:'El Golâa',label:'El Golâa',position:[36.806496,10.181532]},{value:'Souk Lahad',label:'Souk Lahad',position:[36.806496,10.181532]}],   
    'Kef':[{value:'El Kef',label:'El Kef',position:[36.806496,10.181532]},{value:'Dahmani',label:'Dahmani',position:[36.806496,10.181532]},{value:'Jérissa',label:'Jérissa',position:[36.806496,10.181532]},{value:'Kalaat es Senan',label:'Kalaat es Senan',position:[36.806496,10.181532]},{value:'Kalâa Khasba',label:'Kalâa Khasba',position:[36.806496,10.181532]},{value:'Menzel Salem',label:'Menzel Salem',position:[36.806496,10.181532]},{value:'Nebeur',label:'Nebeur',position:[36.806496,10.181532]},{value:'El Ksour',label:'El Ksour',position:[36.806496,10.181532]},{value:'Sakiet Sidi Youssef',label:'Sakiet Sidi Youssef',position:[36.806496,10.181532]},{value:'Sers',label:'Sers',position:[36.806496,10.181532]},{value:'Tajerouine',label:'Tajerouine',position:[36.806496,10.181532]},{value:'Touiref',label:'Touiref',position:[36.806496,10.181532]}],
    
    //T
    'Tunis':[{value:'Tunis',label:'Tunis',position:[36.806496,10.181532]},{value:'Carthage',label:'Carthage',position:[36.806496,10.181532]},{value:'Le Bardo',label:'Le Bardo',position:[36.806496,10.181532]},{value:'La Goulette',label:'La Goulette',position:[36.806496,10.181532]},{value:'Le Kram',label:'Le Kram',position:[36.806496,10.181532]},{value:'La Marsa',label:'La Marsa',position:[36.806496,10.181532]},{value:'Sidi Bou Said',label:'Sidi Bou Said',position:[36.806496,10.181532]},{value:'Sidi Hassine',label:'Sidi Hassine',position:[36.806496,10.181532]}],
    //M
    'Mahdia':[{value:'Mahdia',label:'Mahdia',position:[36.806496,10.181532]},{value:'Bou Merdes',label:'Bou Merdes',position:[36.806496,10.181532]},{value:'Chebba',label:'Chebba',position:[36.806496,10.181532]},{value:'Chorbane',label:'Chorbane',position:[36.806496,10.181532]},{value:'El Bradâa',label:'El Bradâa',position:[36.806496,10.181532]},{value:'Essouassi',label:'Essouassi',position:[36.806496,10.181532]},{value:'Hebira',label:'Hebira',position:[36.806496,10.181532]},{value:'Kerker',label:'Kerker',position:[36.806496,10.181532]},{value:'Ksour Essef',label:'Ksour Essef',position:[36.806496,10.181532]},{value:'Melloulèche',label:'Melloulèche',position:[36.806496,10.181532]},{value:'Ouled Chamekh',label:'Ouled Chamekh',position:[36.806496,10.181532]},{value:'Rejiche',label:'Rejiche',position:[36.806496,10.181532]},{value:'Sidi Alouane',label:'Sidi Alouane',position:[36.806496,10.181532]}], 
    'Manouba':[{value:'Manouba',label:'Manouba',position:[36.806496,10.181532]},{value:'Borj El Amri',label:'Borj El Amri',position:[36.806496,10.181532]},{value:'Den Den',label:'Borj El Amri',position:[36.806496,10.181532]},{value:'Djedeida',label:'Djedeida',position:[36.806496,10.181532]},{value:'Douar Hicher',label:'Douar Hicher',position:[36.806496,10.181532]},{value:'El Battan',label:'El Battan',position:[36.806496,10.181532]},{value:'El Battan',label:'El Battan',position:[36.806496,10.181532]},{value:'Oued Ellil',label:'Oued Ellil',position:[36.806496,10.181532]},{value:'Tebourba',label:'Tebourba',position:[36.806496,10.181532]}],
    'Mednine':[{value:'Medenine',label:'Medenine',position:[36.806496,10.181532]},{value:'Ajim (Djerba)',label:'Ajim (Djerba)',position:[36.806496,10.181532]},{value:'Ben Gardane',label:'Ben Gardane',position:[36.806496,10.181532]},{value:'Beni Khedache',label:'Beni Khedache',position:[36.806496,10.181532]},{value:'Houmt El Souk (Djerba)',label:'Houmt El Souk (Djerba)',position:[36.806496,10.181532]},{value:'Midoun (Djerba)',label:'Midoun (Djerba)',position:[36.806496,10.181532]},{value:'Zarzis',label:'Zarzis',position:[36.806496,10.181532]}], 
    'Monastir':[{value:'Monastir',label:'Monastir',position:[36.806496,10.181532]},{value:'Amiret El Fhoul',label:'Amiret El Fhoul',position:[36.806496,10.181532]},{value:'Amiret El Hojjaj',label:'Amiret El Hojjaj',position:[36.806496,10.181532]},{value:'Amiret Touazra',label:'Amiret Touazra',position:[36.806496,10.181532]},{value:'Bekalta',label:'Bekalta',position:[36.806496,10.181532]},{value:'Bembla-Mnara',label:'Bembla-Mnara',position:[36.806496,10.181532]},{value:'Benen Bodher',label:'Benen Bodher',position:[36.806496,10.181532]},{value:'Beni Hassen',label:'Beni Hassen',position:[36.806496,10.181532]},{value:'Bouhjar',label:'Bouhjar',position:[36.806496,10.181532]},{value:'Cherahil',label:'Cherahil',position:[36.806496,10.181532]},{value:'El Masdour',label:'El Masdour',position:[36.806496,10.181532]},{value:'Ghenada',label:'Ghenada',position:[36.806496,10.181532]},{value:'Jemmal',label:'Jemmal',position:[36.806496,10.181532]},{value:'Khniss',label:'Khniss',position:[36.806496,10.181532]},{value:'Ksar Hellal',label:'Ksar Hellal',position:[36.806496,10.181532]},{value:'Ksibet El Mediouni',label:'Ksibet El Mediouni',position:[36.806496,10.181532]},{value:'Lemta',label:'Lemta',position:[36.806496,10.181532]},{value:'Menzel Ennour',label:'Menzel Ennour',position:[36.806496,10.181532]},{value:'Menzel Farsi',label:'Menzel Farsi',position:[36.806496,10.181532]},{value:'Menzel Hayet',label:'Menzel Hayet',position:[36.806496,10.181532]},{value:'Menzel Kamel',label:'Menzel Kamel',position:[36.806496,10.181532]},{value:'Moôtmar',label:'Moôtmar',position:[36.806496,10.181532]},{value:'Moknine',label:'Moknine',position:[36.806496,10.181532]},{value:'Ouerdanin',label:'Ouerdanin',position:[36.806496,10.181532]},{value:'Sahline',label:'Sahline',position:[36.806496,10.181532]},{value:'Sayada',label:'Sayada',position:[36.806496,10.181532]},{value:'Sidi Ameur',label:'Sidi Ameur',position:[36.806496,10.181532]},{value:'Sidi Bennour',label:'Sidi Bennour',position:[36.806496,10.181532]},{value:'Téboulba',label:'Téboulba',position:[36.806496,10.181532]},{value:'Touza',label:'Touza',position:[36.806496,10.181532]},{value: 'Zaouiet Kontoch',label:'Zaouiet Kontoch',position:[36.806496,10.181532]},{value:'Zéramdine',label:'Zéramdine',position:[36.806496,10.181532]}],

   //N
    'Nabeul':[{value:'Nabeul',label:'Nabeul',position:[36.806496,10.181532]},{value:'Azmour',label:'Azmour',position:[36.806496,10.181532]},{value:'Béni Khalled',label:'Béni Khalled',position:[36.806496,10.181532]},{value:'Béni Khiar',label:'Béni Khiar',position:[36.806496,10.181532]},{value:'Bou Argoub',label:'Bou Argoub',position:[36.806496,10.181532]},{value:'Dar Allouch',label:'Dar Allouch',position:[36.806496,10.181532]},{value:'Dar Chaabane',label:'Dar Chaabane',position:[36.806496,10.181532]},{value:'El Haouaria',label:'El Haouaria',position:[36.806496,10.181532]},{value:'El Maâmoura',label:'El Maâmoura',position:[36.806496,10.181532]},{value:'El Mida',label:'El Mida',position:[36.806496,10.181532]},{value:'Grombalia',label:'Grombalia',position:[36.806496,10.181532]},{value:'Hammamet',label:'Hammamet',position:[36.806496,10.181532]},{value:'Hammam Ghezèze',label:'Hammam Ghezèze',position:[36.806496,10.181532]},{value:'Kelibia',label:'Kelibia',position:[36.806496,10.181532]},{value:'Korba',label:'Korba',position:[36.806496,10.181532]},{value:'Korbous',label:'Korbous',position:[36.806496,10.181532]},{value:'Menzel Bouzelfa',label:'Menzel Bouzelfa',position:[36.806496,10.181532]},{value:'Menzel Horr',label:'Menzel Horr',position:[36.806496,10.181532]},{value:'Menzel Temime',label:'Menzel Temime',position:[36.806496,10.181532]},{value:'Somâa',label:'Somâa',position:[36.806496,10.181532]},{value:'Soliman',label:'Soliman',position:[36.806496,10.181532]},{value:'Takelsa',label:'Takelsa',position:[36.806496,10.181532]},{value:'Tazerka',label:'Tazerka',position:[36.806496,10.181532]},{value:'Zaouiet Djedidi',label:'Zaouiet Djedidi',position:[36.806496,10.181532]}],

   //S//
    'Sfax':[{value:'Sfax',label:'Sfax',position:[36.806496,10.181532]},{value:'Agareb',label:'Agareb',position:[36.806496,10.181532]},{value:'Bir Ali Ben Khélifa',label:'Bir Ali Ben Khélifa',position:[36.806496,10.181532]},{value:'Chihia',label:'Chihia',position:[36.806496,10.181532]},{value:'El Ain',label:'El Ain',position:[36.806496,10.181532]},{value:'El Hencha',label:'El Hencha',position:[36.806496,10.181532]},{value:'Ghraïnisia',label:'Ghraïnisia',position:[36.806496,10.181532]},{value:'Gremda',label:'Gremda',position:[36.806496,10.181532]},{value:'Jebiniana',label:'Jebiniana',position:[36.806496,10.181532]},{value:'Kerkennah',label:'Kerkennah',position:[36.806496,10.181532]},{value:'Mahares',label:'Mahares',position:[36.806496,10.181532]},{value:'Menzel Chaker',label:'Menzel Chaker',position:[36.806496,10.181532]},{value:'Sakiet Eddaïer',label:'Sakiet Eddaïer',position:[36.806496,10.181532]},{value:'Sakiet Ezzit',label:'Sakiet Ezzit',position:[36.806496,10.181532]},{value:'Skhira',label:'Skhira',position:[36.806496,10.181532]},{value:'Thyna',label:'Thyna',position:[36.806496,10.181532]}],
 
    'Siliana':[{value:'Siliana',label:'Siliana',position:[36.806496,10.181532]},{value:'Bargou',label:'Bargou',position:[36.806496,10.181532]},{value:'Bou Arada',label:'Bou Arada',position:[36.806496,10.181532]},{value:'El Aroussa',label:'El Aroussa',position:[36.806496,10.181532]},{value:'El Krib',label:'El Krib',position:[36.806496,10.181532]},{value:'Gaâfour',label:'Gaâfour',position:[36.806496,10.181532]},{value:'Maktar',label:'Maktar',position:[36.806496,10.181532]},{value:'Rouhia',label:'Rouhia',position:[36.806496,10.181532]},{value:'Kesra',label:'Kesra',position:[36.806496,10.181532]},{value:'Sidi Bou Rouis',label:'Sidi Bou Rouis',position:[36.806496,10.181532]}],
    
    'Sousse':[{value:'Sousse',label:'Sousse',position:[36.806496,10.181532]},{value:'Akouda',label:'Akouda',position:[36.806496,10.181532]},{value:'Boufich',label:'Boufich',position:[36.806496,10.181532]},{value:'Enfidha',label:'Enfidha',position:[36.806496,10.181532]},{value:'Ezzouhour',label:'Ezzouhour',position:[36.806496,10.181532]},{value:'Hammam Sousse',label:'Hammam Sousse',position:[36.806496,10.181532]},{value:'Hergla',label:'Hergla',position:[36.806496,10.181532]},{value:'Kalâa Kebira',label:'Kalâa Kebira',position:[36.806496,10.181532]},{value:"Kalâa Seghira",label:'Kalâa Seghira',position:[36.806496,10.181532]},{value:"Konda",label:'Konda',position:[36.806496,10.181532]},{value:'Ksibet Thrayet',label:'Ksibet Thrayet',position:[36.806496,10.181532]},{value:"Messaadine",label:'Messaadine',position:[36.806496,10.181532]},{value:"M'saken",label:"M'saken",position:[36.806496,10.181532]},{value:'Sidi Bou Ali',label:'Sidi Bou Ali',position:[36.806496,10.181532]},{value:'Sidi El Hani',label:'Sidi El Hani',position:[36.806496,10.181532]},{value:'Zaouiet Sousse',label:'Zaouiet Sousse',position:[36.806496,10.181532]}],
    'Sidi Bouzid':[{value:'Sidi Bouzid',label:'Sidi Bouzid',position:[36.806496,10.181532]},{value:'Bir El Hafey',label:'Bir El Hafey',position:[36.806496,10.181532]},{value:'Cebalet Ouled Asker',label:'Cebalet Ouled Asker',position:[36.806496,10.181532]},{value:'Jilma',label:'Jilma',position:[36.806496,10.181532]},{value:'Meknassy',label:'Meknassy',position:[36.806496,10.181532]},{value:'Menzel Bouzaian',label:'Menzel Bouzaian',position:[36.806496,10.181532]},{value:'Mezzouna',label:'Mezzouna',position:[36.806496,10.181532]},{value:'Ouled Haffouz',label:'Ouled Haffouz',position:[36.806496,10.181532]},{value:'Regueb',label:'Regueb',position:[36.806496,10.181532]},{value:'Sidi Ali Ben Aoun',label:'Sidi Ali Ben Aoun',position:[36.806496,10.181532]}],
    //T
    'Tataouine':[{value:'Tataouine',label:'Tataouine',position:[36.806496,10.181532]},{value:'Bir Lahmar',label:'Bir Lahmar',position:[36.806496,10.181532]},{value:'Dehiba',label:'Dehiba',position:[36.806496,10.181532]},{value:'Ghomrassen',label:'Ghomrassen',position:[36.806496,10.181532]},{value:'Remada',label:'Remada',position:[36.806496,10.181532]}],
    'Tozeur':[{value:'Tozeur',label:'Tozeur',position:[36.806496,10.181532]},{value:'Degache',label:'Degache',position:[36.806496,10.181532]},{value:'Hamet Jerid',label:'Hamet Jerid',position:[36.806496,10.181532]},{value:'Nafta',label:'Nafta',position:[36.806496,10.181532]},{value:'Tamerza',label:'Tamerza',position:[36.806496,10.181532]}],
    //z
    'Zaghouan':[{value:'Zaghouan',label:'Zaghouan',position:[36.806496,10.181532]},{value:'Bir Mcherga',label:'Bir Mcherga',position:[36.806496,10.181532]},{value:'Djebel Oust',label:'Djebel Oust',position:[36.806496,10.181532]},{value:'El Fahs',label:'El Fahs',position:[36.806496,10.181532]},{value:'Nadhour',label:'Nadhour',position:[36.806496,10.181532]},{value:'Zriba',label:'Zriba',position:[36.806496,10.181532]}],
}


export const gtest : MygovernorateType[] =[
    {label:'1'},
    {label:'3'},
    {label:'4'},
    {label:'5'},
    {label:'6'},
    {label:'7'},
    {label:'8'},
    

]

export const mtest:MyType={
    '1':[{label:'11'},{label:'12'},{label:'13'},{label:'14'},{label:'15'}],
    '2':[{label:'22'},{label:'22'},{label:'23'},{label:'24'},{label:'25'}],
    '3':[{label:'33'},{label:'32'},{label:'33'},{label:'34'},{label:'35'}],
    '4':[{label:'44'},{label:'42'},{label:'43'},{label:'44'},{label:'45'}],
    '5':[{label:'55'},{label:'52'},{label:'53'},{label:'54'},{label:'55'}],
    '6':[{label:'66'},{label:'62'},{label:'63'},{label:'64'},{label:'65'}],
    '7':[{label:'77'},{label:'72'},{label:'73'},{label:'74'},{label:'75'}],
    '88':[{label:'88'},{label:'882'},{label:'883'},{label:'884'},{label:'885'}],
}

 

export const governorates:MygovernorateType[] =[
    {value: 'Ariana', label: 'Ariana',position:[36.806496,10.181532]},
    {value: 'Ben Arous', label: 'Ben Arous',position:[36.806496,10.181532]},
    {value: 'Béja', label: 'Béja',position:[36.806496,10.181532]},
    {value: 'Bizerte', label: 'Bizerte',position:[36.806496,10.181532]},
    {value: 'Gabès', label: 'Gabès',position:[36.806496,10.181532]},
    {value: 'Gafsa', label: 'Gafsa',position:[36.806496,10.181532]},
    {value: 'Jendouba', label: 'Jendouba',position:[36.806496,10.181532]},
    {value: 'Kairouan', label: 'Kairouan',position:[36.806496,10.181532]},
    {value: 'Kasserine', label: 'Kasserine',position:[36.806496,10.181532]},
    {value: 'Kebili', label: 'Kebili',position:[36.806496,10.181532]},
    {value: 'Kef', label: 'Kef',position:[36.806496,10.181532]},
    {value: 'Tunis', label: 'Tunis',position:[36.806496,10.181532]},
    {value: 'Mahdia', label: 'Mahdia',position:[36.806496,10.181532]},
    {value: 'Manouba', label: 'Manouba',position:[36.806496,10.181532]},
    {value: 'Mednine', label: 'Mednine',position:[36.806496,10.181532]},
    {value: 'Monastir', label: 'Monastir',position:[36.806496,10.181532]},
    {value: 'Nabeul', label: 'Nabeul',position:[36.806496,10.181532]},
    {value: 'Sfax', label: 'Sfax',position:[36.806496,10.181532]},
    {value: 'Siliana', label: 'Siliana',position:[36.806496,10.181532]},
    {value: 'Sousse', label: 'Sousse',position:[36.806496,10.181532]},
    {value: 'Sidi Bouzid', label: 'Sidi Bouzid',position:[36.806496,10.181532]},
    {value: 'Tataouine', label: 'Tataouine',position:[36.806496,10.181532]},
    {value: 'Tozeur', label: 'Tozeur',position:[36.806496,10.181532]},
    {value: 'Zaghouan', label: 'Zaghouan',position:[36.806496,10.181532]},


]


export interface Groupeditem{
    label:string,options:MygovernorateType[]
}


const groupedcities:Groupeditem[]=[]


Object.keys(cities).map(key=>{
    groupedcities.push({label:key,options :cities[key] as MygovernorateType[]})
})


export {groupedcities}



interface somef{
    (e:{label:string,value:string},sting:string):boolean
}

export const filterOption:somef = ({ label, value }, string) => {
    // default search
    if (label.includes(string) || value.includes(string as never)) return true;
  
    // check if a group as the filter string as label
    const groupOptions = groupedcities.filter((group) =>
      group.label.toLocaleLowerCase().includes(string)
    );
  
    if (groupOptions) {
      for (const groupOption of groupOptions) {
        // Check if current option is in group
        const option = groupOption.options.find((opt) => {
            const valuelower=opt.value?.toLowerCase()
            valuelower?.includes(value.toLowerCase())});
        if (option) {
          return true;
        }
      }
    }
    return false;
  };
  





