const Flags = {
  kor: {
    alt: "Korean Flag",
    src:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAvCAYAAABe1bwWAAAKbElEQVRoQ+1bZ1RU1xb+7szcmaEjoLGXZ+8ajY/ELoomVrBH7AICoiCiglIUFJVQFBSxxUKSp8aKXaPGFnuJXeyVZkCkTL9Z5/iGxzigc2eCaz2W+xfrss/e3/lOuefs7w6DEpYvU/ZhAE9wGkeA+QIAU/L/FfBvDuAywAjOckCypZQ9oO0j7TjHcdICmXI9AwyvgJ03uEscsNlCyo5nGKaIElNYpNjEAW4GR6jAjgyQYm4mHs3ky5TODMcdrMB95d01jmF6MwUy5TZwnCvv1hW5AcPsYAqKFFkAHCpyP/n3jUsnxHD8G+q22JDyC+RyBYYNHgRbWxtTwxnV/u3bfOw7cBiDXfpDJBIZFaNEI43JxKSnZ8B7WiA0Gg2WxkShTu1aUKlU/wQ4Xp2bPXcebt2+C/cJY9C/bx9ebUtzNpmYRdHxOHP2PHr36gGfyZPw4uUrzJ4zD4MG9KWjV15GBuLo8RMQCATo0a0LLly8goioaFhbW2HViniYm5mZlNokYm7fuYdZc8JhZibFysRYVLK1RdSSOPxx7gK+7d0TXh4TTAL3ocaXr/6J8IhFsLGxRvLyOEpEUMh83Lx1B8OHuGDUyKEm5TaaGI7jEBgUintpD+D2/TC6v9y4eRvBoREUJAFLQJenaZfP8KEuGDViKO7eu4+ZwWEQi8VYtTwOlSrZGp3eaGJOnDqDH+IS4eBgj5UJMWBZFgGzQnD/wUOMcRuBIS4DygYlV0B99To0N+9Ck/YQXFY2oFACEjEYB3sI6tSCoFUzCNu1ps/Ksjt30+iMlYjFSF4RR2esdmn3cXaCt+fET0uMQqmEt28AMrOy4T/VC927dsax308iblkSKjs4ICkxBmKW1QelVEK15zDUB4+CKyz6KGjG3AzC3t0h6usMiEuJB+gtXbLHTfGbSWMnxC1GzRrVP5rnH9t8t+1IBXlFN6hfDzGLI6FUKuHlOwNZ2dkI8PNB184d9XJpHj2FMnkDuJfpvIEyVauA9RwLQf26em2fv3gJX/9Z9Hli/BLUqF4NSavWYf/BI/j6318haKY/73ykAe+l9CYvD57e/igsKsLC+SFo0bwptmzbiZSft6BRw/qIjpoPhtG9lGtu3IYifhWgUBgFkjZiWYh9JkDwZSu9GMtXrsHBw0fxjWMHzA70Q05OLjx9/CFXKLB4QTiaNG7IOy9vYt4fjdzcN5g8ZTolalFkGJo1bawDQnMnDYoliYBKxRucXgORCOI5/nozhxDh4eMPhUKB6Kh5aNSwAX76z1Zs3rqD4iG4+BpvYn7dvgu7Uvdj0YIwOm3fH62SALj8AiiCIsG9yeOLq0x/xsYa4kVzwVhY6PiQGUtmbvNmTRAVEUoHisxsMsPDQ2bjyzb6M+1DoHgTQ4KRPYW8hZ4+e45pAUF06SxfGo1qVUlt63+m/PEXqI+dMp4UgQCMtRVdgiU3a2H3TmDHj9SJS4jw8PZDXt5bhAYHon27tvQASA6C5OUgFAp54TCKGG2GnNxcbPl1J6RSCca66QLlcnIhDwgzagkJGv4Lwu96gmvcCJn5aohZAexEKmhOn4c69RA4uRyS+Mh3pJWw1L0HsHrdRqOXT8lYJhHzoSFQHzoOZcpWXqMEhoFohAteNG+PLal3cPFaBpRKNY1hbSVBZ8eaGNLpC0iTVkPYsQNE/Zx1Z6hSie0799BTN7kamGLlRoxi8TJ6gONjhJQzlRojcd1lqFSaUpva2UoR6t4K1X7bB9bXnU94Xr7lRozcKxBcQaHBYAT1auPxGHfMiToJtbp0UrTBKtubI2Z8fVg2b2BwfL6O5UaMbKIf2aUNxsO6j0bYaSVu3c02qM1Il6YYOqCJQb7GOJUbMfI5C8E9e2EYJoZBYUQY3MNPgTOwbFanpjXiIpwMi2+EV7kRo9q1H6ptewyCJGjcAKe7DUbCmksG+RMnViTA5tUDDfbn61huxNy7+Qp11q4Al/3XhzEJBWDnBmB2ymM8eJxjMH5LCxYbE/sZ7M/XsdyIiUu+iDGdHWCZvApczpvScYlEYCe5YXeuDTZtvckLe9OG9lgQ3IVXGz7OJhNDClb5+QWwsrLUybtjXxqOn3mKuR6tYXvyODRnLoB7m//Oh2UhaNkU7OB+SL1VhA2brxu8t2iTuA1pDte+jfT6Sg545MDpOrA/LCzM+XCh42sSMeTKH7t0OSRiCaIiQ3UCv8mTwz3gAKQSEe1AV8casNXIAKUKcisbXE/Lwe4Dabhp4FuoZHChgEHSEmc42Ot2XFuCIIOlLcwby4xRxJA7Uu1aNVFQUAgPHz8Q6SJ41nQ4dmivg2Ptz39i7+EHxc8sLcRgWQHy8uRQawx8/ZTSs15d68JrXFu9/2ird07du2DalMnIzn6NeQuXYKjrQHTp9A0vjngTE7t0BY6fOIWIsGC0btUCu/fsx5ofN9GbNikUlbysFRQq4Rt8BLlvZLxAfcjZ1kaK+EgnWFvqljzvpd1HYFAYWJEIKxJiUKWyAxJWrMLh347TASMDx8d4E0PKDht/2ox6desg/oeF9PbqPXUGXqVnwHPSOPT9Vvf+cu9hDkKiTkBZxhGfD1iRSIDQgI5o0URfOJ0TFonrN25hUP/vMGGcG549f4Gp02eTLzloibNWzRp8UvGv4JFi0GTfADpNp/p4omePrlRXItPYxtqaFqXf13QuXktHbNJ5yOTvLoTGmEQsxCxfR7RpUUWv+eUr1xAeuRjm5uZUHSAXSK2M08upG3y9PXin5D1jSAZt4dvB3g5JCTFUriBSBtGZiDpAVIL37f6jHMQknUdGluH3J22MGtWs4OfRDvXrVtKLS2aEf2AwHj56UizjaNUDsqyI3kWUDL5mFDEEzPSZc/Hg4SMqbBGBS6vpEDBEJSBqwfsmk6uwc38a9hx6gMKij9+jzM1Y9HeuT99qLFt6oen3k6cRE7+cakhEy5JKJMXCm+vAfhg35nu+nFB/o4ghDa9dv4GQ8IVUhUxOjKNi/uKYpTh95hytmBFZpSwjBJ27/ApXr2fg4ZNcZGYXQq5QQywWooqDOZo0sEOrZlXQvk1V+rovy4hGTva39IxMqnqSOszFS1cwf2E0PcMQqdbKUvd8ZShLRhNDEhAABIhWjiUAfaYFUlGfyCpEXilP27v/EJLXrEf1alVpaZXo2KTU+vjJ04+Lfh8BZhIx2p2f5FgWu4ju/GvXp2BX6j60bNEMC+bNLTde1Go13L2mIfv1Xwic7ovOHb8u3vvs7CohOTEWEonE6PwmEUOyalWCr9q3RUhQIN7m58N/RjB6OnWjByu+RWg+PSFHhMNHjmH0qOF0lnpNnYHMzCz61QX5+sIUM5kYUhD39JkOmUxGZwiZKeRsQ6b1p7STp/5AdFwClWTJucXUATGZGNJ5cujLyMzCiGGusLez+5R86OQ6f+ESPTq0ad3SZAyEmM/f4OnT+Jp8tbkdHOdiMsUVKQD5avPzd776I8oxDPnpwOcvw0tSU/xlOHnIcZzZf39LMKwirQjefWGYreYS0dji3xJoAxTIZP2hEU4EwzkC0FXoeWf5v2mQAY45C4F6nYVUuluL+m9s05veq3dEKgAAAABJRU5ErkJggg==",
  },
  usa: {
    alt: "USA Flag",
    src:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAvCAYAAABe1bwWAAADfElEQVRoQ+2bX0hTURzHv2dO829ONpNMs4ggiF4KzB4KKTOVEjJ1EEWZ+A8q6imlh3qIwPXQH+jBpFooas4/YBD21EuG/YGgeqkWgovp0G3+mzP358S9sGWx7e7eyby73vM0uL9zzu/72fccfmc7l2BFK9MZS0DRAKAAQBYAsvL5an7u+Ni6msMJHYsC1EJARikUbWpD27BvIFZ44c2xxOQkjx6AVugMfPuJBMx/aZPni0ipyTXcdbJgynQ/O0DpGb7iIokXJxiAUtKp6Xt0lpTqfhQTSl5FIlJIX7GCYbVQcoyUtRr7AVQIERdJH1GDAQYZMFMANJGIFNJX3GDoJAOGChGWnRGPhiMa3OibENId4gYDr2AwVQUqnD+kRl37OMx2F284IgcDwWB0p7dgd04iOt/Y0P3WLoNhCKQlKtB1aTsUBKxbGNfwbZJ0zNE9abhSusnPornbjC8mJy82hstbecVHO5j3UspRx+O2NhvqVKU/V8usG61DFnybWAo7/5gG01ikYQEkb1CwgpkltC0zAXHMGgrQnMteeLyA0+WFx0MxNedGc485YGxMg7lQqMapfFXYLlgZ6PJQ3Hlhwch3h/TAMIrK96Wj7rCG3WjDbfNLXtwanMTXEPtOTDvGB6JgZwpayrOgjOOmMz3vxvVeM35ZQ9c2kgDDAKrIV6G2UM1pmmvd5pBO8Q0gGTCZaUrom/JCgllY8kL7YIwTHhMgHTAbldA3hgaz7KaoujcGt5f7+CUZMAd3paK5nPm1M3Rr6THj8zh3sSeZyrepSIPje9NZKnaHB10jNhgtv5GnSYD2QAY2q+LZZwMfZvD4tZWLn9hP1+EfIh/W5LLF3TujA/eHpzC76PGLT1ASFk5lvgommwsXn5rWD5hnTXnoHbXj5ac5BNtBmOPC/h0p6H8/s37AcCrlGSCZPYanbs5wGUwQRDIYGQzn6vknQHZMrDrG4Vzmrt/5mUES0UQGE/h7lMEE8bcMRgbDb+uTHSM7RnYMPwLBHGOtqpPrmABwiAwmSB0jg5HB8Np7mKW0JnfweGUZ9WBqZcAMADgZ9bnFPeEgsVbWF4PQqN/zFTUXghL2X/rpyvoOQqJ7M1ysYPw3w5kETVVXk5Lpgh4E1WJNOCp5ERgWaeo5/7sEvklt1bUnQBW19O/bJ1HJZ40nsRBg1AM8yTS0D/ly+QMpzH7D4sxATQAAAABJRU5ErkJggg==",
  },
  aus: {
    alt: "Australian Flag",
    src:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM0MTQ3OUI7IiBkPSJNNDczLjY1NSw4OC4yNzVIMzguMzQ1QzE3LjE2Nyw4OC4yNzUsMCwxMDUuNDQyLDAsMTI2LjYyVjM4NS4zOA0KCWMwLDIxLjE3NywxNy4xNjcsMzguMzQ1LDM4LjM0NSwzOC4zNDVoNDM1LjMxYzIxLjE3NywwLDM4LjM0NS0xNy4xNjcsMzguMzQ1LTM4LjM0NVYxMjYuNjINCglDNTEyLDEwNS40NDIsNDk0LjgzMyw4OC4yNzUsNDczLjY1NSw4OC4yNzV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRjVGNUY1OyIgZD0iTTguODI4LDI1NS45OTloMTUuMzM0bDgxLjc3LTUzLjU3NHY1My41NzRoNDQuMTM4di01My41NzRsODEuNzY5LDUzLjU3NGgxNS4zMzQNCgljNC44NzUsMCw4LjgyOC0zLjk1Myw4LjgyOC04LjgyOHYtNy4wMDJsLTcwLjE1NS00NS45NjNIMjU2di00NC4xMzhoLTcwLjE1NUwyNTYsMTA0LjEwNXYtNy4wMDJjMC00Ljg3Ni0zLjk1My04LjgyOC04LjgyOC04LjgyOA0KCWgtMTUuMzM0bC04MS43Nyw1My41NzRWODguMjc1SDEwNS45M3Y1My41NzRMMjYuODQ0LDkwLjAzM2MtOS4yMzQsMi45LTE2Ljk1NCw5LjIwMy0yMS43MTEsMTcuNDM0bDY1LjAyMyw0Mi42MDFIMHY0NC4xMzhoNzAuMTU1DQoJTDAsMjQwLjE2OXY3LjAwMkMwLDI1Mi4wNDYsMy45NTEsMjU1Ljk5OSw4LjgyOCwyNTUuOTk5eiIvPg0KPGc+DQoJPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGNEI1NTsiIHBvaW50cz0iMjU2LDE1OC44OTYgMTQxLjI0MSwxNTguODk2IDE0MS4yNDEsODguMjc1IDExNC43NTksODguMjc1IDExNC43NTksMTU4Ljg5NiAwLDE1OC44OTYgDQoJCTAsMTg1LjM3OCAxMTQuNzU5LDE4NS4zNzggMTE0Ljc1OSwyNTUuOTk5IDE0MS4yNDEsMjU1Ljk5OSAxNDEuMjQxLDE4NS4zNzggMjU2LDE4NS4zNzggCSIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjRCNTU7IiBkPSJNOC4yMjcsMTAyLjkwMWw3Mi42NjIsNDcuMTY3aDE2LjIxNGwtODIuNDk2LTUzLjU1QzEyLjIzOCw5OC4zODgsMTAuMDk3LDEwMC41MzEsOC4yMjcsMTAyLjkwMXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY0QjU1OyIgZD0iTTE2Ni4yODMsMTUwLjA2OGw4OC4zNzQtNTcuMzY2Yy0xLjUzNi0yLjU5OS00LjI0Ni00LjQyNy03LjQ4NS00LjQyN2gtMS45MWwtOTUuMTkzLDYxLjc5M0gxNjYuMjgzDQoJCXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY0QjU1OyIgZD0iTTg5LjQ3NCwxOTQuMjA2TDEuMjY5LDI1MS40NjJjMS41MjEsMi42NjIsNC4yNzMsNC41MzcsNy41NTksNC41MzdoMS42NjVsOTUuMTk2LTYxLjc5M0g4OS40NzR6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNEI1NTsiIGQ9Ik0yNTUuODYsMjQ3Ljg2NWwtODIuNjY2LTUzLjY1OEgxNTYuOThsOTMuODc0LDYwLjkzNQ0KCQlDMjUzLjY2NiwyNTMuODM3LDI1NS41OTUsMjUxLjEwMiwyNTUuODYsMjQ3Ljg2NXoiLz4NCjwvZz4NCjxnPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGNUY1RjU7IiBkPSJNMTMwLjY3MSwzMDQuMTNsNi42NjMsMjEuOTk3bDIxLjM1My04LjUwNWMxLjgyMi0wLjcyNiwzLjQ3OCwxLjM1MiwyLjM2NiwyLjk2NmwtMTMuMDQ0LDE4LjkyNA0KCQlsMTkuOTYyLDExLjM5MWMxLjcwMywwLjk3MiwxLjExMiwzLjU2Mi0wLjg0NCwzLjY5OWwtMjIuOTI5LDEuNjAxbDMuNTQxLDIyLjcwOWMwLjMwMiwxLjkzOC0yLjA5MiwzLjA5MS0zLjQxOCwxLjY0Ng0KCQlsLTE1LjU0OC0xNi45MjhsLTE1LjU0OCwxNi45MjhjLTEuMzI2LDEuNDQ0LTMuNzIsMC4yOTEtMy40MTgtMS42NDZsMy41NDEtMjIuNzA5bC0yMi45MjktMS42MDENCgkJYy0xLjk1Ni0wLjEzNy0yLjU0OC0yLjcyNy0wLjg0NC0zLjY5OWwxOS45NjItMTEuMzkxbC0xMy4wNDQtMTguOTI0Yy0xLjExMi0xLjYxNCwwLjU0NC0zLjY5MiwyLjM2Ni0yLjk2NmwyMS4zNTMsOC41MDUNCgkJbDYuNjYzLTIxLjk5N0MxMjcuNDQ2LDMwMi4yNTMsMTMwLjEwMywzMDIuMjUzLDEzMC42NzEsMzA0LjEzeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGNUY1RjU7IiBkPSJNMzkzLjI3OSwxNDcuNzI5bDMuMjU1LDEwLjc0NWwxMC40My00LjE1NGMwLjg4OS0wLjM1NCwxLjY5OSwwLjY2LDEuMTU1LDEuNDQ5bC02LjM3MSw5LjI0NQ0KCQlsOS43NTEsNS41NjVjMC44MzIsMC40NzQsMC41NDMsMS43NC0wLjQxMywxLjgwNmwtMTEuMiwwLjc4MmwxLjcyOSwxMS4wOTNjMC4xNDgsMC45NDctMS4wMjIsMS41MS0xLjY3LDAuODA0bC03LjU5NS04LjI2OQ0KCQlsLTcuNTk1LDguMjY5Yy0wLjY0OCwwLjcwNS0xLjgxNywwLjE0Mi0xLjY3LTAuODA0bDEuNzI5LTExLjA5M2wtMTEuMi0wLjc4MmMtMC45NTYtMC4wNjctMS4yNDUtMS4zMzItMC40MTMtMS44MDZsOS43NTEtNS41NjUNCgkJbC02LjM3MS05LjI0NWMtMC41NDQtMC43ODksMC4yNjYtMS44MDMsMS4xNTUtMS40NDlsMTAuNDMxLDQuMTU0bDMuMjU1LTEwLjc0NUMzOTEuNzAzLDE0Ni44MTEsMzkzLjAwMiwxNDYuODExLDM5My4yNzksMTQ3LjcyOXoiDQoJCS8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0Y1RjVGNTsiIGQ9Ik0zMjAuNzAyLDIzMC4yMDRsMy4yNTUsMTAuNzQ1bDEwLjQzMS00LjE1NGMwLjg4OS0wLjM1NCwxLjY5OSwwLjY2LDEuMTU1LDEuNDQ5bC02LjM3MSw5LjI0NQ0KCQlsOS43NTEsNS41NjVjMC44MzIsMC40NzQsMC41NDMsMS43NC0wLjQxMywxLjgwNmwtMTEuMiwwLjc4MmwxLjczLDExLjA5M2MwLjE0OCwwLjk0Ny0xLjAyMiwxLjUxLTEuNjcsMC44MDRsLTcuNTk1LTguMjY5DQoJCWwtNy41OTUsOC4yNjljLTAuNjQ4LDAuNzA1LTEuODE3LDAuMTQyLTEuNjctMC44MDRsMS43My0xMS4wOTNsLTExLjItMC43ODJjLTAuOTU2LTAuMDY3LTEuMjQ1LTEuMzMyLTAuNDEzLTEuODA2bDkuNzUxLTUuNTY1DQoJCWwtNi4zNzEtOS4yNDVjLTAuNTQ0LTAuNzg5LDAuMjY2LTEuODAzLDEuMTU1LTEuNDQ5bDEwLjQzMSw0LjE1NGwzLjI1NS0xMC43NDVDMzE5LjEyNiwyMjkuMjg3LDMyMC40MjQsMjI5LjI4NywzMjAuNzAyLDIzMC4yMDR6Ig0KCQkvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGNUY1RjU7IiBkPSJNNDYxLjk0MywxOTQuODkzbDMuMjU1LDEwLjc0NWwxMC40MzEtNC4xNTRjMC44ODktMC4zNTQsMS42OTksMC42NiwxLjE1NSwxLjQ0OWwtNi4zNzEsOS4yNDUNCgkJbDkuNzUxLDUuNTY1YzAuODMyLDAuNDc0LDAuNTQzLDEuNzQtMC40MTMsMS44MDZsLTExLjIsMC43ODJsMS43MywxMS4wOTNjMC4xNDgsMC45NDctMS4wMjIsMS41MS0xLjY3LDAuODA0bC03LjU5NS04LjI2OQ0KCQlsLTcuNTk1LDguMjY5Yy0wLjY0OCwwLjcwNS0xLjgxNywwLjE0Mi0xLjY2OS0wLjgwNGwxLjczLTExLjA5M2wtMTEuMi0wLjc4MmMtMC45NTYtMC4wNjctMS4yNDUtMS4zMzItMC40MTMtMS44MDZsOS43NTEtNS41NjUNCgkJbC02LjM3MS05LjI0NWMtMC41NDQtMC43ODksMC4yNjYtMS44MDMsMS4xNTUtMS40NDlsMTAuNDMxLDQuMTU0bDMuMjU1LTEwLjc0NUM0NjAuMzY3LDE5My45NzcsNDYxLjY2NSwxOTMuOTc3LDQ2MS45NDMsMTk0Ljg5M3oiDQoJCS8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0Y1RjVGNTsiIGQ9Ik0zOTMuMjc5LDMzNi4xMzVsMy4yNTUsMTAuNzQ1bDEwLjQzLTQuMTU1YzAuODg5LTAuMzU0LDEuNjk5LDAuNjYsMS4xNTUsMS40NDlsLTYuMzcxLDkuMjQ1DQoJCWw5Ljc1MSw1LjU2NWMwLjgzMiwwLjQ3NCwwLjU0MywxLjc0LTAuNDEzLDEuODA2bC0xMS4yLDAuNzgybDEuNzI5LDExLjA5M2MwLjE0OCwwLjk0Ny0xLjAyMiwxLjUxLTEuNjcsMC44MDRsLTcuNTk1LTguMjY5DQoJCWwtNy41OTUsOC4yNjljLTAuNjQ4LDAuNzA1LTEuODE3LDAuMTQyLTEuNjctMC44MDRsMS43MjktMTEuMDkzbC0xMS4yLTAuNzgyYy0wLjk1Ni0wLjA2Ni0xLjI0NS0xLjMzMi0wLjQxMy0xLjgwNmw5Ljc1MS01LjU2NQ0KCQlsLTYuMzcxLTkuMjQ1Yy0wLjU0NC0wLjc4OSwwLjI2Ni0xLjgwMywxLjE1NS0xLjQ0OWwxMC40MzEsNC4xNTVsMy4yNTUtMTAuNzQ1QzM5MS43MDMsMzM1LjIxOSwzOTMuMDAyLDMzNS4yMTksMzkzLjI3OSwzMzYuMTM1eiINCgkJLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRjVGNUY1OyIgZD0iTTQxOC40NjEsMjQ5LjUxMmwtMi42MTMsNy44MzZsLTguMjU5LDAuMDY0Yy0xLjA2OSwwLjAwOS0xLjUxMywxLjM3My0wLjY1MiwyLjAwOGw2LjY0NCw0LjkwNw0KCQlsLTIuNDkyLDcuODc1Yy0wLjMyMiwxLjAyLDAuODM5LDEuODYzLDEuNzA4LDEuMjQxbDYuNzItNC44MDNsNi43Miw0LjgwM2MwLjg3LDAuNjIxLDIuMDMtMC4yMjIsMS43MDgtMS4yNDFsLTIuNDkyLTcuODc1DQoJCWw2LjY0NS00LjkwN2MwLjg2MS0wLjYzNiwwLjQxNy0xLjk5OS0wLjY1Mi0yLjAwOGwtOC4yNTktMC4wNjRsLTIuNjEzLTcuODM2QzQyMC4yMzQsMjQ4LjQ5OCw0MTguNzk5LDI0OC40OTgsNDE4LjQ2MSwyNDkuNTEyeiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=",
  },
};

export default Flags;