

const dummyData = [
  {
      "vote_count": 12275,
      "id": 120,
      "video": false,
      "vote_average": 8.2,
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "popularity": 40.551,
      "poster_path": "/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
      "original_language": "en",
      "original_title": "The Lord of the Rings: The Fellowship of the Ring",
      "genre_ids": [
          12,
          14,
          28
      ],
      "backdrop_path": "/pIUvQ9Ed35wlWhY2oU6OmwEsmzG.jpg",
      "adult": false,
      "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
      "release_date": "2001-12-18"
  },
  {
      "vote_count": 11196,
      "id": 122,
      "video": false,
      "vote_average": 8.3,
      "title": "The Lord of the Rings: The Return of the King",
      "popularity": 29.052,
      "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
      "original_language": "en",
      "original_title": "The Lord of the Rings: The Return of the King",
      "genre_ids": [
          12,
          14,
          28
      ],
      "backdrop_path": "/8BPZO0Bf8TeAy8znF43z8soK3ys.jpg",
      "adult": false,
      "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam bring the ring closer to the heart of Mordor, the dark lord's realm.",
      "release_date": "2003-12-01"
  },
  {
      "vote_count": 10577,
      "id": 121,
      "video": false,
      "vote_average": 8.2,
      "title": "The Lord of the Rings: The Two Towers",
      "popularity": 27.137,
      "poster_path": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
      "original_language": "en",
      "original_title": "The Lord of the Rings: The Two Towers",
      "genre_ids": [
          12,
          14,
          28
      ],
      "backdrop_path": "/dG4BmM32XJmKiwopLDQmvXEhuHB.jpg",
      "adult": false,
      "overview": "Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
      "release_date": "2002-12-18"
  },
  {
      "vote_count": 277,
      "id": 123,
      "video": false,
      "vote_average": 6.4,
      "title": "The Lord of the Rings",
      "popularity": 8.568,
      "poster_path": "/1l3WpoF7TX9pOprX4XepCXjQXUV.jpg",
      "original_language": "en",
      "original_title": "The Lord of the Rings",
      "genre_ids": [
          12,
          16,
          18,
          14
      ],
      "backdrop_path": "/8HqSxB9VLJkbRXRdlocbLq9wxwY.jpg",
      "adult": false,
      "overview": "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
      "release_date": "1978-11-15"
  },
  {
      "vote_count": 1,
      "id": 453779,
      "video": false,
      "vote_average": 6,
      "title": "A Passage to Middle-earth: Making of 'Lord of the Rings'",
      "popularity": 2.027,
      "poster_path": "/sDsmtdmsS1KqJTKwKb1hJ9VFL6w.jpg",
      "original_language": "en",
      "original_title": "A Passage to Middle-earth: Making of 'Lord of the Rings'",
      "genre_ids": [
          99
      ],
      "backdrop_path": null,
      "adult": false,
      "overview": "",
      "release_date": "2001-12-09"
  },
  {
      "vote_count": 5,
      "id": 192349,
      "video": false,
      "vote_average": 6.2,
      "title": "National Geographic - Beyond the Movie: The Lord of the Rings",
      "popularity": 1.303,
      "poster_path": "/im7xas15LRqPUCwdLyDjOxdE4uH.jpg",
      "original_language": "en",
      "original_title": "National Geographic - Beyond the Movie: The Lord of the Rings",
      "genre_ids": [
          99
      ],
      "backdrop_path": "/puAMVrEI9gKGPJDbKUSf9QvWZ2p.jpg",
      "adult": false,
      "overview": "A documentary about the influences on Tolkien, covering in brief his childhood and how he detested the onslaught of industry through the idyllic countryside, moving on to describe his fighting experience from WWI, and closing with a look at the Finnish inspiration for the scholar's self-invented languages of Elfish. In between are interviews with the cast of the films and some clips, by far the most from \"The Fellowship of the Ring\", but a few glimpses of Rohan riders (from \"The Two Towers\") are provided. Also, there are interviews with a range of the filmmakers.",
      "release_date": "2001-12-23"
  },
  {
      "vote_count": 0,
      "id": 550599,
      "video": false,
      "vote_average": 0,
      "title": "The Lord of the Rings: The Fellowship of the Ring (Extended Edition)",
      "popularity": 1.432,
      "poster_path": "/7vxyk1RBL7jAa0I6sDDeIOBUrCd.jpg",
      "original_language": "en",
      "original_title": "The Lord of the Rings: The Fellowship of the Ring (Extended Edition)",
      "genre_ids": [],
      "backdrop_path": null,
      "adult": false,
      "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
      "release_date": ""
  },
  {
      "vote_count": 2,
      "id": 155586,
      "video": false,
      "vote_average": 6.8,
      "title": "Creating the Lord of the Rings Symphony",
      "popularity": 0.6,
      "poster_path": "/kDXXB3qQiFOExnl0HK2HlglDJuI.jpg",
      "original_language": "en",
      "original_title": "Creating the Lord of the Rings Symphony",
      "genre_ids": [
          99
      ],
      "backdrop_path": "/9kw9LqyNmgru8qFEoTZE9towoiU.jpg",
      "adult": false,
      "overview": "Creating The Lord of the Rings Symphony includes excerpts of live concert footage from The Lord of the Rings Symphony: Six Movements for Orchestra, Chorus and Soloists, documentary commentary by Howard Shore, and the illustrations of Alan Lee and John Howe.",
      "release_date": "2004-12-14"
  },
  {
      "vote_count": 2,
      "id": 335612,
      "video": false,
      "vote_average": 7.5,
      "title": "The Making of 'The Lord of the Rings'",
      "popularity": 0.6,
      "poster_path": null,
      "original_language": "en",
      "original_title": "The Making of 'The Lord of the Rings'",
      "genre_ids": [
          99
      ],
      "backdrop_path": null,
      "adult": false,
      "overview": "A collection of The Making of 'The Fellowship of the Ring', 'The Two Towers' and 'The Return of the King'. This documentary treats movie, special effect and fantasy fans to a behnd-the-scenes look at the making of The Lord of the Rings, Peter Jackson's blockbuster three-film adaptation of J.R.R. Tolkien's classic work of fiction about the battle to save Middle Earth from the power of Sauron, and the quest that must be undertaken by a single small hobbit. Includes interviews with director Jackson, stars Ian McKellen and Elijah Wood, and the rest of the cast and crew who share some of the experiences they had in making the film, as well as discuss the massive effort that went into making the myths and monsters of Middle Earth a reality.",
      "release_date": "2002-04-06"
  },
  {
      "vote_count": 1,
      "id": 296260,
      "video": false,
      "vote_average": 8,
      "title": "Master of the Rings: The Unauthorized Story Behind J.R.R. Tolkien's 'Lord of the Rings'",
      "popularity": 0.6,
      "poster_path": "/jJsVP5uJn3U7cAplliLdC6Vs2dp.jpg",
      "original_language": "en",
      "original_title": "Master of the Rings: The Unauthorized Story Behind J.R.R. Tolkien's 'Lord of the Rings'",
      "genre_ids": [
          99
      ],
      "backdrop_path": null,
      "adult": false,
      "overview": "This documentary examines the social and cultural underpinnings of the trilogy of The Lord of the Rings by J.R.R. Tolkien, in an attempt to understand the work's phenomenal success and influence. The program looks for answers in the author's sources of inspiration, from the folk legends of Norway to the field of linguistics of which Tolkien was a lifelong student. It finds that the deep chord the story strikes owes its resonance to the author's use of archetypal imagery and language. Many examples of these recurrent themes and images are given, with readings from the work and other literature. Interviews with the book's illustrators, the brothers Hildebrandt, speak to the power of the imagery in the classic story. Scholars, Tolkien's children, and the author himself provide insight into the mythic themes and the spell they have cast over the vast readership of The Lord of the Rings.",
      "release_date": "2001-12-04"
  },
  {
      "vote_count": 102,
      "id": 1362,
      "video": false,
      "vote_average": 6,
      "title": "The Hobbit",
      "popularity": 6.307,
      "poster_path": "/xP93GoIe8MI23n5ZQ7aZLTzLE0g.jpg",
      "original_language": "en",
      "original_title": "The Hobbit",
      "genre_ids": [
          10751,
          14,
          16,
          12
      ],
      "backdrop_path": "/fcZDxvCD4Pg7lO2RwHNS0DC1B3m.jpg",
      "adult": false,
      "overview": "Bilbo Baggins the Hobbit was just minding his own business, when his occasional visitor Gandalf the Wizard drops in one night. One by one, a whole group of dwarves drop in, and before he knows it, Bilbo has joined their quest to reclaim their kingdom, taken from them by the evil dragon Smaug. The only problem is that Gandalf has told the dwarves that Bilbo is an expert burglar, but he isn't...",
      "release_date": "1977-11-27"
  },
  {
      "vote_count": 13,
      "id": 1361,
      "video": false,
      "vote_average": 5.3,
      "title": "The Return of the King",
      "popularity": 1.939,
      "poster_path": "/rmjhiMrx6cqwsrg4tqYuIBk5SkY.jpg",
      "original_language": "en",
      "original_title": "The Return of the King",
      "genre_ids": [
          16,
          10751,
          14
      ],
      "backdrop_path": "/5RAqAsGehjveRczMAtkEttLrv22.jpg",
      "adult": false,
      "overview": "Two Hobbits struggle to destroy the Ring in Mount Doom while their friends desperately fight evil Lord Sauron's forces in a final battle.",
      "release_date": "1980-05-11"
  }
]

export default dummyData 