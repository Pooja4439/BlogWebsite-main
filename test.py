d =    {
        "count": 9,
        "next": "http://127.0.0.1:8000/blog/getblogs/?page=2",
        "previous": None,
        "results": [
            {
                "id": 13,
                "author": 8,
                "title": "test",
                "body": "testing this blog",
                "date_time": "2023-07-09T17:55:39.076554Z",
                "author_name": "rohit12"
            },
            {
                "id": 15,
                "author": 7,
                "title": "test",
                "body": "gello",
                "date_time": "2023-07-09T17:57:14.599922Z",
                "author_name": "hello"
            },
            {
                "id": 16,
                "author": 7,
                "title": "test",
                "body": "this is a test blog",
                "date_time": "2023-07-10T08:05:35.212093Z",
                "author_name": "hello"
            },
            {
                "id": 17,
                "author": 8,
                "title": "ANother one",
                "body": "Just testing",
                "date_time": "2023-07-10T08:39:10.496923Z",
                "author_name": "rohit12"
            },
            {
                "id": 19,
                "author": 13,
                "title": "just another blog",
                "body": "testing purpose",
                "date_time": "2023-07-21T08:42:32.267437Z",
                "author_name": "username1"
            }
        ]
    }

print(d.keys())