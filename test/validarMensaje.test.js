const assert = require('assert');
const { validateMessage } = require('../una-lib/validarMensaje');

describe('Función validateMessage', function() {

  it('debería devolver null para script malicioso', function() {
    const result = validateMessage('<script>alert("XSS")</script>');
    assert.strictEqual(result, null);
  });

  it('debería devolver objeto type=text para texto normal', function() {
    const result = validateMessage('Hola mundo');
    assert.deepStrictEqual(result, { type: 'text', content: 'Hola mundo' });
  });

  it('debería reconocer una URL de imagen', function() {
    const url = 'https://via.placeholder.com/150.png';
    const result = validateMessage(url);
    assert.deepStrictEqual(result, { type: 'image', url });
  });

  it('debería reconocer una URL de video', function() {
    const url = 'https://www.w3schools.com/html/mov_bbb.mp4';
    const result = validateMessage(url);
    assert.deepStrictEqual(result, { type: 'video', url });
  });

  it('debería reconocer una URL de YouTube', function() {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const result = validateMessage(url);
    assert.deepStrictEqual(result, { type: 'youtube', url });
  });

});
