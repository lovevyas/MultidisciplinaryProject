/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias */

/**
 * Reduce calls to the passed function.
 *
 * @param func - Function to debounce.
 * @param threshold - The delay to avoid recalling the function.
 * @param execAsap - If true, the Function is called at the start of the threshold, otherwise the Function is called at the end of the threshold.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, threshold: number, execAsap = false): T {
    let timeout: any;

    return function debounced(this: any, ...args: any[]): any {
        const self = this;

        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(self, args);

        timeout = setTimeout(delayed, threshold || 100);

        function delayed(): void {
            if (!execAsap) func.apply(self, args);
            timeout = null;
        }
    } as T;
}

export async function  getVideoPath(id:number){
    const basePath = import.meta.env.VITE_BACKEND_URL
    const request = fetch(`${basePath}/get-video?submission_id=${id}`, {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem('Authorization') || ''
      },
    }).then((response) => {
      return response.blob();
    });
   
    await request.then((videoFile) => {
      const videoEl = document.getElementById('vid-'+id)
      if( !( videoFile instanceof Blob ) ) throw new Error( '`videoFile` must be a Blob or File object.' );
      if( !( videoEl instanceof HTMLVideoElement ) ) throw new Error( '`videoEl` must be a <video> element.' );
      const newObjectUrl = URL.createObjectURL( videoFile );
     
      const oldObjectUrl = videoEl.currentSrc;
      if( oldObjectUrl && oldObjectUrl.startsWith('blob:') ) {

        videoEl.src = ''; 
        URL.revokeObjectURL( oldObjectUrl );
    }

        videoEl.src = newObjectUrl;
      
      return false;
    });

    
  }