import pytest
# Remember use keep_auth to send request.
"""
    If pytest gives some db permission error then add permission to the accessing user i.e. Django user in my case it was 
    Blogger so I added perm to it manually in psql
"""

"""
    This client will be reponsible for implementing post, get,put and delete requests.
    User django default db i.e blogdb in psql server.
    Make sure every function starts with test as registered in pytest.ini
"""
# @pytest.mark.django_db
# def test_login_user(get_token):
#     assert get_token['access'] != ""

@pytest.mark.django_db
def test_access_blog(keep_auth):
    res = keep_auth.get("/blog/getblog/")
    assert res.status_code == 200

# Testing the get user api in which it access the user id using the token provided
@pytest.mark.django_db
def test_get_user(keep_auth):
    res = keep_auth.post('/auth/user/')
    assert res.json()['id'] == 3