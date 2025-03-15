import random


city_names = [
    "New York", "Tokyo", "Paris", "London", "Sydney", "Dubai", "Rome", "Singapore", "Barcelona", "Istanbul",
    "Los Angeles", "Berlin", "Hong Kong", "Bangkok", "Moscow", "Toronto", "San Francisco", "Chicago", "Shanghai", "Amsterdam",
    "Beijing", "Seoul", "Mumbai", "Mexico City", "Buenos Aires", "Cape Town", "Rio de Janeiro", "Kuala Lumpur", "Jakarta", "Cairo",
    "Lisbon", "Madrid", "Vienna", "Prague", "Dublin", "Stockholm", "Helsinki", "Oslo", "Copenhagen", "Warsaw",
    "Budapest", "Athens", "Brussels", "Zurich", "Geneva", "Munich", "Frankfurt", "Milan", "Venice", "Florence",
    "Edinburgh", "Glasgow", "Manchester", "Birmingham", "Liverpool", "Leeds", "Sheffield", "Bristol", "Nottingham", "Leicester",
    "Cardiff", "Belfast", "Dundee", "Aberdeen", "Inverness", "Perth", "Stirling", "Cambridge", "Oxford", "Bath",
    "York", "Chester", "Canterbury", "Winchester", "Exeter", "Durham", "Lincoln", "Worcester", "Gloucester", "Salisbury",
    "Plymouth", "Southampton", "Portsmouth", "Brighton", "Hove", "Eastbourne", "Hastings", "Margate", "Ramsgate", "Folkestone",
    "Dover", "Ashford", "Maidstone", "Tonbridge", "Tunbridge Wells", "Sevenoaks", "Guildford", "Woking", "Reading", "Slough",
    "Windsor", "Eton", "Maidenhead", "Bracknell", "Basingstoke", "Farnborough", "Aldershot", "Fleet", "Camberley", "Farnham",
    "Adilabad", "Anantapur", "Chittoor", "Kakinada", "Guntur", "Hyderabad", "Karimnagar",
    "Khammam", "Krishna", "Kurnool", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad",
    "Ongole", "Srikakulam", "Nellore", "Visakhapatnam", "Vizianagaram", "Warangal",
    "Eluru", "Kadapa", "Anjaw", "Changlang", "East Siang", "Kurung Kumey", "Lohit",
    "Lower Dibang Valley", "Lower Subansiri", "Papum Pare", "Tawang", "Tirap",
    "Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang",
    "Baksa", "Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji",
    "Dima Hasao", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi",
    "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj",
    "Kokrajhar", "Lakhimpur", "Marigaon", "Nagaon", "Nalbari", "Sibsagar",
    "Sonitpur", "Tinsukia", "Udalguri", "Araria", "Arwal", "Aurangabad", "Banka",
    "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran",
    "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria",
    "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
    "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur",
    "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali",
    "West Champaran", "Chandigarh", "Bastar", "Bijapur", "Bilaspur", "Dantewada",
    "Dhamtari", "Durg", "Jashpur", "Janjgir-Champa", "Korba", "Koriya", "Kanker",
    "Kabirdham (Kawardha)", "Mahasamund", "Narayanpur", "Raigarh", "Rajnandgaon",
    "Raipur", "Surguja", "Dadra and Nagar Haveli", "Daman", "Diu", "Central Delhi",
    "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi",
    "South Delhi", "South West Delhi", "West Delhi", "North Goa", "South Goa",
    "Ahmedabad", "Amreli district", "Anand", "Banaskantha", "Bharuch", "Bhavnagar",
    "Dahod", "The Dangs", "Gandhinagar", "Jamnagar", "Junagadh", "Kutch", "Kheda",
    "Mehsana", "Narmada", "Navsari", "Patan", "Panchmahal", "Porbandar", "Rajkot",
    "Sabarkantha", "Surendranagar", "Surat", "Vyara", "Vadodara", "Valsad",
    "Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hissar", "Jhajjar",
    "Jind", "Karnal", "Kaithal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal",
    "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar",
    "Bilaspur", "Chamba", "Hamirpur", "Kangra"    
]


def generate_options():
    return random.sample(city_names, 4)