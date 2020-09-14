



## Notes:

I think we're going to stick with a single generation, generation 8.  The rules change through the generations, so would require largely new logics for each generation.



### UI Logics:  from spec:


_________________________________________________________________




#### Abilities  : This is complex.  
Need two normal slots and one hidden slot.  But the hidden slot is determined by Personality.



#### Colors  :: This is simple


#### Evolutions: 



#### Genders: 


#### Locations


#### Moves


#### Type: 
What is type?


#### Varieties:



______________________________________________________________

### AJAX Calls:



#### Generation 8:
We make a call to generation 8 first.  This returns a lot of information:

    - moves  53 moves
    - species 84 species

Well, actually that's basically it for enumerable variables.


#### Abilities:
Simple enough.


#### Color:
Super simple, returns a few colors


#### Evolution Chain:

This returns an array with more endpoints, so need to do another AJAX call for each evolution chain.


#### Evolution Trigger:
Simple enough.  Returns an array with names, and URIs for presumably new information.


#### Genders:
Super simple, just returns male, female, genderless.

#### Locations:
There are location-areas and locations


#### Moves:
Cursive fetch

#### Type:
I see this in type of move.  It doesn't appear to be independently variable of Moves.


#### Varieties:
This doesn't appear to be independently variable of Species.


#### Species
The specification doesn't call for a Species variable, but given the Varieties requirement, which is not satisfied by an API endpoint, this would be a sensible addition.