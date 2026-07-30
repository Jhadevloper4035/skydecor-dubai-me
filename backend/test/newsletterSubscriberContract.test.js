import assert from 'node:assert/strict';
import test from 'node:test';

import NewsletterSubscriber from '../src/model/newsletterSubscriber.model.js';

test('newsletter subscribers normalize email and default to subscribed', async () => {
  const subscriber = new NewsletterSubscriber({
    email: ' Updates@Example.COM ',
  });

  await subscriber.validate();

  assert.equal(subscriber.email, 'updates@example.com');
  assert.equal(subscriber.status, 'subscribed');
  assert.equal(subscriber.source, 'footer');
});

test('newsletter subscribers require a valid email', async () => {
  const subscriber = new NewsletterSubscriber({
    email: 'not-an-email',
  });

  await assert.rejects(() => subscriber.validate(), /email/i);
});
