#!/bin/sh
set -e

echo "Starting WAZZEN backend..."

# Give the database a few seconds to be reachable before uvicorn starts
# (EasyPanel starts services in parallel; DB may need a moment)
for i in $(seq 1 15); do
  python -c "
import asyncpg, asyncio, os, sys
async def check():
    url = os.environ.get('DATABASE_URL', '')
    # asyncpg uses postgres:// scheme, not postgresql+asyncpg://
    url = url.replace('postgresql+asyncpg://', 'postgresql://')
    try:
        conn = await asyncpg.connect(url, timeout=3)
        await conn.close()
        print('DB reachable')
    except Exception as e:
        print(f'DB not ready: {e}', file=sys.stderr)
        sys.exit(1)
asyncio.run(check())
" && break
  echo "Waiting for database... attempt $i/15"
  sleep 3
done

exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2
