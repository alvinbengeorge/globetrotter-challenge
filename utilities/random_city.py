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
    "Godalming", "Haslemere", "Petersfield", "Alton", "Winchester", "Andover", "Salisbury", "Warminster", "Trowbridge", "Chippenham",
    "Swindon", "Newbury", "Hungerford", "Marlborough", "Devizes", "Calne", "Melksham", "Trowbridge", "Frome", "Wells",
    "Glastonbury", "Street", "Bridgwater", "Taunton", "Minehead", "Exeter", "Torquay", "Paignton", "Brixham", "Dartmouth",
    "Totnes", "Newton Abbot", "Teignmouth", "Dawlish", "Exmouth", "Sidmouth", "Seaton", "Axminster", "Honiton", "Cullompton",
    "Tiverton", "Crediton", "Okehampton", "Barnstaple", "Bideford", "Ilfracombe", "South Molton", "Torrington", "Holsworthy", "Bude",
    "Launceston", "Bodmin", "St Austell", "Truro", "Falmouth", "Penryn", "Helston", "Penzance", "St Ives", "Hayle",
    "Camborne", "Redruth", "Newquay", "Padstow", "Wadebridge", "Bodmin", "Liskeard", "Saltash", "Torpoint", "Plymouth",
    "Tavistock", "Ivybridge", "Kingsbridge", "Salcombe", "Dartmouth", "Totnes", "Brixham", "Paignton", "Torquay", "Teignmouth",
    "Dawlish", "Exeter", "Crediton", "Tiverton", "Cullompton", "Honiton", "Axminster", "Seaton", "Sidmouth", "Exmouth",
    "Budleigh Salterton", "Ottery St Mary", "Sidmouth", "Lyme Regis", "Seaton", "Bridport", "Dorchester", "Weymouth", "Portland",
    "Blandford Forum", "Shaftesbury", "Gillingham", "Sherborne", "Sturminster Newton", "Bournemouth", "Poole", "Wimborne Minster", "Ferndown",
    "Verwood", "Christchurch", "Ringwood", "Lymington", "New Milton", "Brockenhurst", "Lyndhurst", "Fordingbridge", "Hythe",
    "Totton", "Romsey", "Winchester", "Alresford", "Petersfield", "Liss", "Liphook", "Haslemere", "Midhurst", "Petworth",
    "Chichester", "Bognor Regis", "Littlehampton", "Arundel", "Worthing", "Shoreham-by-Sea", "Hove", "Brighton", "Lewes",
    "Newhaven", "Seaford", "Eastbourne", "Hailsham", "Uckfield", "Heathfield", "Crowborough", "Hastings", "Bexhill",
    "Battle", "Rye", "Winchelsea", "Tenterden", "Cranbrook", "Hawkhurst", "Robertsbridge", "Etchingham", "Mayfield",
    "Wadhurst", "Ticehurst", "Burwash", "Hailsham", "Polegate", "Pevensey", "Herstmonceux", "Bexhill", "Battle",
    "Rye", "Winchelsea", "Hastings", "St Leonards", "Bexhill", "Eastbourne", "Seaford", "Newhaven", "Peacehaven",
    "Lewes", "Uckfield", "Crowborough", "Heathfield", "Hailsham", "Polegate", "Hove", "Brighton", "Shoreham",
    "Lancing", "Worthing", "Littlehampton", "Arundel", "Bognor Regis", "Chichester", "Selsey", "Midhurst", "Petworth",
    "Pulborough", "Storrington", "Billingshurst", "Horsham", "Crawley", "East Grinstead", "Haywards Heath", "Burgess Hill",
    "Hassocks", "Henfield", "Steyning", "Shoreham", "Southwick", "Lancing", "Worthing", "Littlehampton", "Arundel",
    "Bognor Regis", "Chichester", "Selsey", "Midhurst", "Petworth", "Pulborough", "Storrington", "Billingshurst", "Horsham",
    "Crawley", "East Grinstead", "Haywards Heath", "Burgess Hill", "Hassocks", "Henfield", "Steyning", "Shoreham",
    "Southwick", "Lancing", "Worthing", "Littlehampton", "Arundel", "Bognor Regis", "Chichester", "Selsey", "Midhurst",
    "Petworth", "Pulborough", "Storrington", "Billingshurst", "Horsham", "Crawley", "East Grinstead", "Haywards Heath", "Burgess Hill",
    "Hassocks", "Henfield", "Steyning", "Shoreham", "Southwick", "Lancing", "Worthing", "Littlehampton", "Arundel",
    "Bognor Regis", "Chichester", "Selsey", "Midhurst", "Petworth", "Pulborough", "Storrington", "Billingshurst", "Horsham",
    "Crawley", "East Grinstead", "Haywards Heath", "Burgess Hill", "Hassocks", "Henfield", "Steyning", "Shoreham"
]

def generate_options():
    return random.sample(city_names, 4)