addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const variantUrl = 'https://cfw-takehome.developers.workers.dev/api/variants'

  // request variants from API
  let cfReq = await fetch(variantUrl, {})
  let variants = await cfReq.json()

  // clean up JSON into our array
  variants = variants.variants

  // distribute requests 50/50
  let pageReq
  if (Math.random() > 0.5) {
    pageReq = await fetch(variants[0], {})
  } else {
    pageReq = await fetch(variants[1], {})
  }

  let page = await pageReq.text()

  return new Response(page, {
    headers: { 'content-type': 'text/HTML' },
  })
}
