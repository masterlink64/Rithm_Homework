from app import app, User, Message
import unittest


# making a class for test cases
class MyAppIntegrationTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_index(self):
        client = app.test_client()
        result = client.get('/users')
        # matt = User(first_name="Matt", ...) # plus save + commit
        # look for people on db
        self.assertIn(b'<h2>Here are the people in our app!</h2>', result.data)
        # self.assertIn(b'Lane, Matt', result.data)

    def test_create_user(self):
        client = app.test_client()
        result = client.post(
            '/users', data={
                'first_name': 'Clark',
                'last_name': 'Kent'
            })
        clark = User.query.filter(User.first_name == 'Clark',
                                  User.last_name == 'Kent').first()
        self.assertEqual(clark.first_name, 'Clark')
        # checking if post worked
        self.assertEqual(result.status_code, 302)

        # can get to result get after you post
        result = client.get('/users')
        self.assertIn(b'Clark Kent', result.data)

    def test_reading_user(self):
        client = app.test_client()
        result = client.get('/users/1')
        self.assertIn(b'<h1>Hairy is Awesome!!!</h1>', result.data)

    def test_updating_user(self):
        client = app.test_client()
        result = client.patch(
            '/users/1', data={
                'first_name': 'Hairy',
                'last_name': 'Potter'
            })
        hairy = User.query.filter(User.first_name == 'Hairy',
                                  User.last_name == 'Potter').first()
        self.assertEqual(hairy.first_name, 'Hairy')
        #  check

    def test_destroying_user(self):
        client = app.test_client()
        result = client.delete('/users/23')
        self.assertEqual(result.status_code, 404)
        # check database to see if user is deleted
        deleted_user = User.query.filter(User.id == 23).first()
        self.assertEqual(deleted_user, None)

    def test_create_msg(self):
        client = app.test_client()
        result = client.post(
            '/users/2/messages',
            data={
                'content': 'hello testing',
                'user_id': '2'
            })
        test_msg = Message.query.filter(Message.content == 'hello testing',
                                        Message.user_id == '2').first()
        self.assertEqual(test_msg.content, 'hello testing')

    def test_reading_msg(self):
        client = app.test_client()
        result = client.get('/users/1/messages')
        self.assertIn(b'WINNER WINNER CHICKEN DINNER', result.data)

    def test_updating_msg(self):
        client = app.test_client()
        result = client.patch(
            '/messages/1', data={'content': 'TESTING FUN OMG SO FUN'})
        update_msg = Message.query.filter(
            Message.content == 'TESTING FUN OMG SO FUN').first()
        self.assertEqual(update_msg.content, 'TESTING FUN OMG SO FUN')
        # check the redirect page

    def test_destroying_msg(self):
        client = app.test_client()
        result = client.delete('/messages/30')
        self.assertEqual(result.status_code, 404)
        deleted_msg = Message.query.filter(Message.id == 30).first()
        self.assertEqual(deleted_msg, None)


if __name__ == '__main__':
    unittest.main()