addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const variant_url = 'https://cfw-takehome.developers.workers.dev/api/variants'

  // request variants from API
  let response = await fetch(variant_url, {})
  let variants = await response.json()

  // clean up JSON into our array
  variants = variants.variants

  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
